/* =============================================================
   Pre-render del build (corre después de `vite build` y del build SSR).
   Genera HTML real por ruta para que buscadores y agentes de IA lean
   la página sin ejecutar JavaScript:
     /                    → dist/public/index.html
     /portfolio/<slug>    → dist/public/portfolio/<slug>/index.html
     ruta desconocida     → dist/public/404.html (Vercel lo sirve con 404)
   Cada página lleva su <title>, description, canonical, Open Graph y
   JSON-LD, más los proyectos incrustados (window.__PROJECTS__) para que
   el navegador hidrate con los mismos datos.

   Proyectos: de Notion (NOTION_API_KEY / NOTION_DATABASE_ID, disponibles
   en el build de Vercel). Sin ellos (build local) usa los de respaldo.
   El dominio sale de SITE_URL o, en Vercel, del dominio de producción.
   ============================================================= */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { fetchProjects } from "../api/_notion.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "dist/public");

const SITE = (
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://huquma-studio-website.vercel.app")
).replace(/\/$/, "");

type Server = typeof import("../client/src/entry-server");
type Project = Parameters<Server["render"]>[1][number];

const server: Server = await import(pathToFileURL(path.join(root, "dist/server/entry-server.js")).href);
const template = await readFile(path.join(publicDir, "index.html"), "utf8");

async function loadProjects(): Promise<Project[]> {
  try {
    const projects = (await fetchProjects()) as Project[];
    if (projects.length > 0) return projects;
    console.warn("[prerender] Notion devolvió 0 proyectos; uso los de respaldo");
  } catch (err) {
    console.warn(`[prerender] Sin Notion (${(err as Error).message}); uso los de respaldo`);
  }
  return server.FALLBACK_PROJECTS;
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function escapeText(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

// JSON dentro de <script>: sin "</script>" ni separadores de línea sueltos
function safeJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
}

function setMeta(html: string, attr: "name" | "property", key: string, value: string): string {
  const re = new RegExp(`<meta ${attr}="${key}" content="[^"]*" />`);
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

type Page = {
  url: string;
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  jsonLd?: unknown;
  noindex?: boolean;
  ogType?: "website" | "article";
  projects?: Project[];
};

function page(markup: string, p: Page): string {
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(p.title)}</title>`);
  html = setMeta(html, "name", "description", p.description);
  html = setMeta(html, "property", "og:title", p.title);
  html = setMeta(html, "property", "og:description", p.description);
  html = setMeta(html, "property", "og:image", p.image ?? `${SITE}/images/og-cover.jpg`);
  html = setMeta(html, "property", "og:type", p.ogType ?? "website");

  const head: string[] = [];
  if (p.canonical) {
    head.push(`<link rel="canonical" href="${escapeAttr(p.canonical)}" />`);
    html = setMeta(html, "property", "og:url", p.canonical);
  }
  if (p.noindex) head.push(`<meta name="robots" content="noindex" />`);
  if (p.jsonLd) head.push(`<script type="application/ld+json">${safeJson(p.jsonLd)}</script>`);
  // Sin JS, las secciones con animación de entrada quedan visibles
  head.push(`<noscript><style>.reveal,.reveal-left{opacity:1!important;transform:none!important}</style></noscript>`);
  html = html.replace("</head>", `    ${head.join("\n    ")}\n  </head>`);

  const data = p.projects ? `<script>window.__PROJECTS__=${safeJson(p.projects)}</script>` : "";
  // data-ssr: la ruta pre-renderizada; main.tsx solo hidrata si coincide con la URL real
  return html.replace('<div id="root"></div>', `<div id="root" data-ssr="${escapeAttr(p.url)}">${markup}</div>${data}`);
}

async function write(file: string, html: string) {
  const out = path.join(publicDir, file);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`[prerender] ${file}`);
}

const projects = await loadProjects();

await write(
  "index.html",
  page(server.render("/", projects), {
    url: "/",
    title: server.HOME_TITLE,
    description: server.HOME_DESCRIPTION,
    canonical: `${SITE}/`,
    jsonLd: server.homeJsonLd(SITE, projects),
    projects,
  }),
);

for (const p of projects) {
  const url = `/portfolio/${p.slug}`;
  await write(
    `portfolio/${p.slug}/index.html`,
    page(server.render(url, projects), {
      url,
      title: server.projectTitle(p),
      description: server.projectDescription(p),
      canonical: `${SITE}${url}`,
      image: p.image,
      jsonLd: server.projectJsonLd(SITE, p),
      projects,
    }),
  );
}

await write(
  "guides/index.html",
  page(server.render("/guides", projects), {
    url: "/guides",
    title: server.GUIDES_TITLE,
    description: server.GUIDES_DESCRIPTION,
    canonical: `${SITE}/guides`,
    jsonLd: server.guidesIndexJsonLd(SITE, server.GUIDES),
    projects,
  }),
);

for (const g of server.GUIDES) {
  const url = `/guides/${g.slug}`;
  await write(
    `guides/${g.slug}/index.html`,
    page(server.render(url, projects), {
      url,
      title: server.guideTitle(g),
      description: g.description,
      canonical: `${SITE}${url}`,
      jsonLd: server.guideJsonLd(SITE, g),
      ogType: "article",
      projects,
    }),
  );
}

await write(
  "404.html",
  page(server.render("/404", projects), {
    url: "/404",
    title: "Page not found | HuQuMa Studio",
    description: server.HOME_DESCRIPTION,
    noindex: true,
  }),
);

console.log(`[prerender] ${projects.length} proyectos · ${server.GUIDES.length} guías · ${SITE}`);
