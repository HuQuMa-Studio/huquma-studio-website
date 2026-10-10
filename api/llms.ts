// /llms.txt (vía rewrite en vercel.json): resumen en Markdown del estudio para
// agentes de IA (https://llmstxt.org). Los proyectos salen de Notion y los
// enlaces usan el host de la petición.

import { FAQS } from "../client/src/data/faq.js";
import { GUIDES } from "../client/src/data/guides.js";
import { fetchProjects, type VercelRes } from "./_notion.js";

// Igual que la sección Services del sitio (ServicesSection.tsx)
const SERVICES = [
  "Architectural & engineering design — plans, elevations, structural and engineering drawings, and the permit set; Hugo takes the permits through the municipality himself",
  "Construction — new custom homes, remodels and additions, from foundation to finishes",
  "DRO services — licensed Director Responsable de Obra in Baja California Sur, for Hugo's own projects and for other builders' projects",
  "Project management — owner's representative on a build run by another contractor (schedule, budget, quality); inspection of a house or lot before you buy it",
  "Facilities management — inspections, maintenance and repairs, hurricane preparation, utilities and predial (property tax), and the house ready between rental guests",
];

const BUILDING_TYPES = "Custom homes, remodels & additions, pools, tiny houses, energy-efficient building";

const WAYS_TO_HIRE = "Design + Build, Design only, Build only, Oversight, or Manage — any stage on its own or the whole house";

const REMOTE_PROCESS = [
  "Progress photos and video on WhatsApp, email reports with spending against the budget, and video calls at key milestones",
  "A 3D digital twin of the house (Matterport) to walk through remotely",
  "One accountable person on site in Loreto for plans, permits, budget and the house itself",
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
    "> Design + Build + Manage practice of Hugo Quintero Maldonado in Loreto, Baja California Sur, México. One accountable person from first sketch to finished home, and facilities management after construction for owners who live abroad. Building in Baja California Sur since 1993.",
    "",
    `- [Website](${base}/): about, services, experience, portfolio and contact`,
    "",
    "## Services",
    "",
    ...SERVICES.map((s) => `- ${s}`),
    "",
    `Building types: ${BUILDING_TYPES}.`,
    "",
    `Ways to hire: ${WAYS_TO_HIRE}.`,
    "",
    "## Building from abroad",
    "",
    ...REMOTE_PROCESS.map((s) => `- ${s}`),
    "",
    ...(portfolio.length ? ["## Portfolio", "", ...portfolio, ""] : []),
    "## Guides",
    "",
    ...GUIDES.map((g) => `- [${g.title}](${base}/guides/${g.slug}): ${g.description}`),
    "",
    "## FAQ",
    "",
    ...FAQS.flatMap((f) => [`### ${f.question}`, "", f.answer, ""]),
    "## Contact",
    "",
    "- [Email hugo@huquma.studio](mailto:hugo@huquma.studio): preferred. Include where the land is, lot size, what you want to build or remodel, ideal timeline, and whether you already have plans.",
    "- [WhatsApp +52 613 122 0058](https://wa.me/526131220058)",
    "- Location: Calle Ayuntamiento SN, Col. Centro, C.P. 23880, Loreto, Baja California Sur, México",
    "- [Google Business Profile](https://maps.app.goo.gl/pKysh7rp6MMPgxNA7): reviews, photos and service areas",
    "",
  ].join("\n");

  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
  res.status(200).send(md);
}
