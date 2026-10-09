// Acceso compartido a la base "Portfolio Web" de Notion. El prefijo "_" evita
// que Vercel lo publique como endpoint; lo usan api/projects.ts y api/sitemap.ts.
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

// Genera un slug URL-safe desde el nombre del proyecto.
// "Villa Cortés" → "villa-cortes"
function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD") // separa los diacríticos
    .replace(/\p{Diacritic}/gu, "") // quita los diacríticos combinantes
    .replace(/[^a-z0-9]+/g, "-") // no-alfanumérico → guion
    .replace(/^-+|-+$/g, ""); // recorta guiones inicial/final
}

// Parsea el campo "Galería URLs" de Notion (texto multilínea, un URL por línea).
// Ignora líneas vacías o sin esquema http(s).
function parseGallery(text: string): string[] {
  if (!text) return [];
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^https?:\/\//.test(line));
}

export type PortfolioProject = ReturnType<typeof mapPage>;

function mapPage(page: NotionPage) {
  const p = page.properties;
  const statusName = p["Estatus"]?.select?.name ?? "";
  const name = plainText(p["Nombre del Proyecto"]?.title);
  const slugManual = plainText(p["Slug"]?.rich_text);
  return {
    id: page.id,
    slug: slugManual || slugify(name),
    name,
    location: plainText(p["Localidad"]?.rich_text),
    // "Tipo" es un Select en Notion (Residential, Commercial, …)
    type: p["Tipo"]?.select?.name ?? plainText(p["Tipo"]?.rich_text),
    status: STATUS_MAP[statusName] ?? "current",
    year: plainText(p["Año"]?.rich_text),
    image: p["Foto Hero URL"]?.url ?? "",
    description: plainText(p["Descripción Corta"]?.rich_text),
    descriptionFull: plainText(p["Descripción Completa"]?.rich_text),
    bedrooms: p["Bedrooms"]?.number ?? null,
    bathrooms: p["Bathrooms"]?.number ?? null,
    squareFeet: p["Square Feet"]?.number ?? null,
    gallery: parseGallery(plainText(p["Galería URLs"]?.rich_text)),
    tags: (p["Etiquetas"]?.multi_select ?? []).map((t) => t.name),
  };
}

export class NotionError extends Error {
  constructor(
    message: string,
    public status: number,
    public detail?: string,
  ) {
    super(message);
  }
}

// Proyectos con "Mostrar en Web", ordenados por "Orden". Descarta los que no
// tienen nombre o Foto Hero URL.
export async function fetchProjects(): Promise<PortfolioProject[]> {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    throw new NotionError("NOTION_API_KEY o NOTION_DATABASE_ID no configurados", 500);
  }

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
    throw new NotionError("Error de la API de Notion", 502, await notionRes.text());
  }

  const data = (await notionRes.json()) as { results: NotionPage[] };
  return data.results.map(mapPage).filter((p) => p.name && p.image);
}

// Tipo mínimo de la respuesta de Vercel que usan los handlers
export type VercelRes = {
  status: (code: number) => VercelRes;
  json: (body: unknown) => void;
  send: (body: string) => void;
  setHeader: (name: string, value: string) => void;
};
