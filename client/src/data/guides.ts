/* =============================================================
   Guías — contenido de /guides y /guides/:slug. Fuente única para la
   página, el pre-render (title, description, JSON-LD Article), el
   sitemap y llms.txt. Sin imports: api/ también lo lee.

   Reglas (Hugo, 2026-10-09): voz de Hugo en primera persona, inglés,
   solo datos confirmados. Sin cifras de tiempos (pidió no darlas) ni de
   costos (pendiente: rango por m²/pie²). Sin asesoría legal: el
   fideicomiso se menciona y se remite a un notario.

   Enlaces dentro del texto: [texto](/ruta) — los convierte GuidePage.
   ============================================================= */

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "note"; text: string };

export type GuideSection = { heading: string; blocks: GuideBlock[] };

export type Guide = {
  slug: string;
  title: string;
  /** meta description y tarjeta del índice (≤160 caracteres) */
  description: string;
  /** entrada bajo el título */
  dek: string;
  published: string; // YYYY-MM-DD
  updated: string; // YYYY-MM-DD
  sections: GuideSection[];
};

export const GUIDES: Guide[] = [
  {
    slug: "building-a-home-in-loreto-from-abroad",
    title: "Building a custom home in Loreto while you live abroad",
    description:
      "How a custom home gets built in Loreto, Baja California Sur, when you live in the US or Canada: owning the land, design, permits, construction and care.",
    dek: "You don't need to live in Loreto to build here. This is how a project runs when the owner is in the US or Canada, from the first email to the years after the keys.",
    published: "2026-10-09",
    updated: "2026-10-09",
    sections: [
      {
        heading: "Owning land near the coast",
        blocks: [
          {
            type: "p",
            text: "Loreto sits inside Mexico's restricted zone, the strip within 50 km of the coast. Foreigners hold a home there through a bank trust (fideicomiso), which a notary public sets up when you buy.",
          },
          {
            type: "note",
            text: "I'm a builder, not a lawyer. Talk to a notary or a real-estate attorney about ownership before you sign anything. If you want me to look at the lot or the house first, I can inspect it before you commit.",
          },
        ],
      },
      {
        heading: "How a project starts",
        blocks: [
          {
            type: "ol",
            items: [
              "You email me where the land is, the lot size, what you want to build, your ideal timeline and whether you already have plans.",
              "We talk it through on a video call.",
              "I visit the lot.",
              "You receive a proposal for your house.",
            ],
          },
        ],
      },
      {
        heading: "Design and permits",
        blocks: [
          {
            type: "p",
            text: "I draw the plans, elevations, and structural and engineering drawings, and put together the permit set. Then I take it through the municipality of Loreto myself, so you don't have to stand in line at an office from another country.",
          },
          {
            type: "p",
            text: "As a licensed DRO (Director Responsable de Obra) I also sign the project and answer for it meeting the building regulations. The documents the municipality asks for are listed in the [permits and DRO guide](/guides/building-permits-and-dro-in-loreto).",
          },
        ],
      },
      {
        heading: "Following the construction from home",
        blocks: [
          { type: "p", text: "I'm on site in Loreto during the build. From wherever you live, you get:" },
          {
            type: "ul",
            items: [
              "Photos and video on WhatsApp as the work moves.",
              "Email reports with what was spent against the budget.",
              "Video calls at the key milestones.",
              "A 3D digital twin of the house, made with Matterport, that you can walk through from your screen.",
            ],
          },
        ],
      },
      {
        heading: "Hiring one stage or the whole house",
        blocks: [
          {
            type: "p",
            text: "You can hire me for the whole house or for one part of it: design and build together, design only, build only, oversight of a build run by another contractor, or care of a finished house. When someone else is building, I act as your representative on site and keep the schedule, budget and quality in check.",
          },
        ],
      },
      {
        heading: "After the keys",
        blocks: [
          { type: "p", text: "If you don't live in Loreto all year, I keep looking after the house while you're away:" },
          {
            type: "ul",
            items: [
              "Regular inspections, maintenance and repairs.",
              "Opening the house before you arrive and closing it when you leave.",
              "Preparation before and after hurricanes.",
              "Tracking and coordinating payment of the property tax (predial) and the electricity, water and sewer bills.",
              "Getting the house ready between rental guests.",
            ],
          },
        ],
      },
      {
        heading: "Cost and timing",
        blocks: [
          {
            type: "p",
            text: "Both depend on your house: its size, the finishes, the lot (slope, access, water and power) and extras such as a pool. Send me those details and I'll give you a first estimate. Once the design is set, we plan the build together and you follow its progress in the reports.",
          },
        ],
      },
    ],
  },
  {
    slug: "building-permits-and-dro-in-loreto",
    title: "Building permits and the DRO in Loreto, BCS",
    description:
      "What you need for a building permit in Loreto, Baja California Sur, what a DRO (Director Responsable de Obra) does, and when your project needs one.",
    dek: "A new house in Loreto needs a building permit from the municipality, and from 40 m² it needs a DRO's signature on it. Here is what that involves and what you'll need to have ready.",
    published: "2026-10-09",
    updated: "2026-10-09",
    sections: [
      {
        heading: "What a DRO is",
        blocks: [
          {
            type: "p",
            text: "A DRO (Director Responsable de Obra) is the licensed professional who signs a construction project and answers for it meeting the building regulations. The DRO signs the building permit and the responsiva, the document in which they take on that responsibility.",
          },
        ],
      },
      {
        heading: "When your project needs one",
        blocks: [
          {
            type: "ul",
            items: [
              "From 40 m² (about 430 sq ft) up to 500 m² (about 5,380 sq ft) of construction: the permit and the responsiva need a DRO's signature.",
              "Over 500 m², or technically complex projects such as large commercial, industrial or public buildings: a certified DRO is required.",
            ],
          },
          {
            type: "p",
            text: "If you're not sure which group your house falls in, send me the size and I'll tell you.",
          },
        ],
      },
      {
        heading: "What the municipality asks for",
        blocks: [
          { type: "p", text: "To get a building permit (licencia de construcción) in Loreto you'll need:" },
          {
            type: "ol",
            items: [
              "Proof of ownership (the deed or title) and the property tax (predial) paid up to date.",
              "The land-use certificate (uso de suelo) and the alignment and official number (alineamiento y número oficial) for the lot.",
              "Feasibility letters for water and sewer (OOMSAPAS) and for power (CFE).",
              "The architectural and structural drawings signed by the DRO, with the DRO's responsiva.",
            ],
          },
          {
            type: "note",
            text: "Requirements can change. When I prepare your file, I work from the municipality's current list.",
          },
        ],
      },
      {
        heading: "Who does what",
        blocks: [
          {
            type: "p",
            text: "You provide the property documents. I prepare the drawings, put the file together, take it through the municipality and sign as DRO. If you live abroad, this is the part of the process you don't have to be here for. The [guide to building from abroad](/guides/building-a-home-in-loreto-from-abroad) covers the rest of the project.",
          },
        ],
      },
      {
        heading: "DRO for someone else's project",
        blocks: [
          {
            type: "p",
            text: "If you already have a designer or a builder, I can still take the DRO role on your project. I'm licensed in Baja California Sur and sign other builders' projects as well as my own.",
          },
        ],
      },
    ],
  },
];

export function guideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/** Minutos de lectura a ~220 palabras por minuto */
export function readingMinutes(guide: Guide): number {
  const text = [
    guide.dek,
    ...guide.sections.flatMap((s) => [
      s.heading,
      ...s.blocks.flatMap((b) => ("text" in b ? [b.text] : b.items)),
    ]),
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

/** Texto plano (sin la sintaxis de enlaces) para JSON-LD y llms.txt */
export function plainText(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
