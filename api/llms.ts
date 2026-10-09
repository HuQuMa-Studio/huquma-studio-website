// /llms.txt (vía rewrite en vercel.json): resumen en Markdown del estudio para
// agentes de IA (https://llmstxt.org). Los proyectos salen de Notion y los
// enlaces usan el host de la petición.

import { fetchProjects, type VercelRes } from "./_notion.js";

const SERVICES = [
  "Custom Builds — new construction",
  "Architectural Design — plans, elevations, structural drawings, permit-ready documentation",
  "Remodeling — renovations and additions",
  "Project Management — full oversight",
  "DRO Services — licensed Director Responsable de Obra in Baja California Sur",
  "Facilities Management — ongoing care of the property after construction",
  "Pool Installation — pools and water features",
  "Tiny Houses — compact living",
  "Sustainable Building — energy-efficient construction",
];

export default async function handler(
  req: { headers: Record<string, string | string[] | undefined> },
  res: VercelRes,
) {
  const host = String(req.headers["x-forwarded-host"] ?? req.headers.host ?? "");
  const base = `https://${host}`;

  let portfolio: string[] = [];
  try {
    portfolio = (await fetchProjects()).map((p) => {
      const meta = [p.type, p.year, p.location].filter(Boolean).join(" · ");
      const desc = p.description ? `: ${p.description}` : "";
      return `- [${p.name}](${base}/portfolio/${encodeURIComponent(p.slug)}) (${meta})${desc}`;
    });
  } catch {
    // Sin Notion: se omite la lista de proyectos
  }

  const md = [
    "# HuQuMa Studio [Design+Build]",
    "",
    "> Design + Build + Manage practice of Hugo Quintero Maldonado in Loreto, Baja California Sur, México. One accountable person from first sketch to finished house, and facilities management after construction for owners who live abroad. Building in Baja California Sur since 1993.",
    "",
    `- [Website](${base}/): about, services, experience, portfolio and contact`,
    "",
    "## Services",
    "",
    ...SERVICES.map((s) => `- ${s}`),
    "",
    ...(portfolio.length ? ["## Portfolio", "", ...portfolio, ""] : []),
    "## Contact",
    "",
    "- [Email hugo@huquma.studio](mailto:hugo@huquma.studio): preferred. Include where the land is, lot size, what you want to build or remodel, ideal timeline, and whether you already have plans.",
    "- [WhatsApp +52 613 122 0058](https://wa.me/526131220058)",
    "- Location: Calle Ayuntamiento SN, Col. Centro, C.P. 23880, Loreto, Baja California Sur, México",
    "",
  ].join("\n");

  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(md);
}
