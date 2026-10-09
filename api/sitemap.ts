// /sitemap.xml (vía rewrite en vercel.json): la portada más una URL por proyecto
// publicado en Notion. Usa el host de la petición, así sirve igual en
// *.vercel.app y en huquma.studio.

import { fetchProjects, type VercelRes } from "./_notion.js";

export default async function handler(
  req: { headers: Record<string, string | string[] | undefined> },
  res: VercelRes,
) {
  const host = String(req.headers["x-forwarded-host"] ?? req.headers.host ?? "");
  const base = `https://${host}`;

  let slugs: string[] = [];
  try {
    slugs = (await fetchProjects()).map((p) => p.slug);
  } catch {
    // Sin Notion: al menos la portada
  }

  const urls = ["/", ...slugs.map((s) => `/portfolio/${encodeURIComponent(s)}`)];
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map((u) => `  <url><loc>${base}${u}</loc></url>`),
    "</urlset>",
    "",
  ].join("\n");

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(xml);
}
