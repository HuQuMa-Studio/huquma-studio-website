// Vercel Serverless Function — entrega los proyectos del portafolio desde Notion.
// Variables de entorno requeridas (configurar en el dashboard de Vercel):
//   NOTION_API_KEY     — Integration token de Notion (secret_...)
//   NOTION_DATABASE_ID — ID de la base "Portfolio Web — HuQuMa Studio"

const NOTION_VERSION = "2022-06-28";

type NotionRichText = { plain_text?: string };

type NotionProperty = {
  title?: NotionRichText[];
  rich_text?: NotionRichText[];
  select?: { name: string } | null;
  multi_select?: { name: string }[];
  url?: string | null;
  number?: number | null;
  checkbox?: boolean;
};

type NotionPage = {
  id: string;
  properties: Record<string, NotionProperty>;
};

// Notion "Estatus" → status que usa el frontend
const STATUS_MAP: Record<string, "current" | "past" | "planned"> = {
  "IN PROGRESS": "current",
  COMPLETED: "past",
  UPCOMING: "planned",
};

function plainText(rt?: NotionRichText[]): string {
  if (!rt || rt.length === 0) return "";
  return rt.map((t) => t.plain_text ?? "").join("");
}

function mapPage(page: NotionPage) {
  const p = page.properties;
  const statusName = p["Estatus"]?.select?.name ?? "";
  return {
    id: page.id,
    name: plainText(p["Nombre del Proyecto"]?.title),
    location: plainText(p["Localidad"]?.rich_text),
    type: plainText(p["Tipo"]?.rich_text),
    status: STATUS_MAP[statusName] ?? "current",
    year: plainText(p["Año"]?.rich_text),
    image: p["Foto Hero URL"]?.url ?? "",
    description: plainText(p["Descripción Corta"]?.rich_text),
    tags: (p["Etiquetas"]?.multi_select ?? []).map((t) => t.name),
  };
}

export default async function handler(
  _req: { method?: string },
  res: {
    status: (code: number) => typeof res;
    json: (body: unknown) => void;
    setHeader: (name: string, value: string) => void;
  },
) {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    res.status(500).json({ error: "NOTION_API_KEY o NOTION_DATABASE_ID no configurados" });
    return;
  }

  try {
    const notionRes = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": NOTION_VERSION,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            property: "Mostrar en Web",
            checkbox: { equals: true },
          },
          sorts: [{ property: "Orden", direction: "ascending" }],
        }),
      },
    );

    if (!notionRes.ok) {
      const detail = await notionRes.text();
      res.status(502).json({ error: "Error de la API de Notion", detail });
      return;
    }

    const data = (await notionRes.json()) as { results: NotionPage[] };
    const projects = data.results
      .map(mapPage)
      .filter((p) => p.name && p.image);

    // Cache en el edge de Vercel: respuesta fresca cada 60s, sirve stale hasta 5 min
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      error: "No se pudieron obtener los proyectos",
      detail: String(err),
    });
  }
}
