// Vercel Serverless Function — entrega los proyectos del portafolio desde Notion.
// La consulta y el mapeo a `Project` viven en api/_notion.ts.

import { NotionError, fetchProjects, type VercelRes } from "./_notion.js";

export default async function handler(_req: { method?: string }, res: VercelRes) {
  try {
    const projects = await fetchProjects();
    // Cache en el edge de Vercel: respuesta fresca cada 60s, sirve stale hasta 5 min
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json(projects);
  } catch (err) {
    if (err instanceof NotionError) {
      res.status(err.status).json({ error: err.message, detail: err.detail });
      return;
    }
    res.status(500).json({
      error: "No se pudieron obtener los proyectos",
      detail: String(err),
    });
  }
}
