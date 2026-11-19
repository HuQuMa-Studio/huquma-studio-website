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
  {
    slug: "building-and-remodeling-in-loreto-bay",
    title: "Building and remodeling in Loreto Bay: what to know first",
    description:
      "Loreto Bay, Baja California Sur: what the community is today, how its design rules and HOA change a build or remodel, and what to check before you start.",
    dek: "I was the DRO of dozens of homes in the original Loreto Bay development and I've designed and built houses next door in Nopoló. This is what I'd want an owner to know before touching a house here.",
    published: "2026-11-17",
    updated: "2026-11-17",
    sections: [
      {
        heading: "My experience here",
        blocks: [
          {
            type: "p",
            text: "From 2006 to 2008 I was the DRO (the licensed professional who signs a project and answers for it) of dozens of homes in the original Loreto Bay development. I have also designed and built several houses in the original FONATUR subdivision in Nopoló, which borders Loreto Bay. That is the experience behind this guide.",
          },
        ],
      },
      {
        heading: "What Loreto Bay is today",
        blocks: [
          {
            type: "p",
            text: "Loreto Bay, originally called The Villages of Loreto Bay, is a walkable seaside community of several hundred homes, a residential and resort neighborhood between the Sea of Cortez and the Sierra de la Giganta. It started in 2003 as a much larger master plan and lost its original developer in the 2008–2009 financial crisis, with only part of it built.",
          },
          {
            type: "p",
            text: "Today it runs as a quiet community managed by its own homeowners' association (HOA). Most owners are from the US and Canada, and many come only for the winter. It is in Nopoló, the tourist corridor FONATUR planned between the town of Loreto and Puerto Escondido, about a 15-minute drive south of town and close to the airport. Houses are grouped around plazas, canals and pedestrian lanes (paseos) that you cover on foot, by bike or in an electric golf cart.",
          },
          {
            type: "p",
            text: "Many listings in Nopoló are advertised as \"Loreto Bay\". Before you buy, confirm exactly where a property is and what rights of access it really has.",
          },
        ],
      },
      {
        heading: "How building here differs",
        blocks: [
          {
            type: "p",
            text: "Anywhere in Loreto you need the municipal permit and a DRO. Inside Loreto Bay you also answer to a private regime: the community's master rules, the sub-regimes of each condominium area, and its Design Guidelines, which the HOA enforces.",
          },
          {
            type: "ul",
            items: [
              "Approval comes first. Before the municipal permit, any new build, major remodel or visible exterior change needs the written approval of the HOA's Design Review Committee. That includes changes as small as paint color, doors, windows, pergolas, light fixtures or house-number plaques.",
              "The layout is dense and walkable. Houses sit on their lot lines along narrow pedestrian lanes, and life turns toward private courtyards and rooftop terraces. The guidelines limit how much of the lot can be built, how tall, and what can overlook a neighbor's patio.",
              "Materials and finishes are set. The guidelines call for a traditional Mexican colonial look: plaster with rounded edges, clay tile on pitched roofs, wood or wood-look exterior doors, and colors from the community's approved palette.",
              "Thick, shaded walls. The community was designed for the climate, with heavy exterior walls, recessed doors and windows, and natural ventilation toward the courtyards. The first houses used compressed-earth walls; later ones used an insulated concrete wall system.",
            ],
          },
          {
            type: "note",
            text: "The Design Guidelines and community rules are updated by the HOA. I work from the current version for each project, and you should too.",
          },
        ],
      },
      {
        heading: "The site rules contractors must follow",
        blocks: [
          {
            type: "p",
            text: "Construction inside the community runs under rules that most contractors in Loreto aren't used to:",
          },
          {
            type: "ul",
            items: [
              "Fixed work hours, no work on Sundays or holidays, and workers carrying ID from their company.",
              "Doors, windows, cabinets and countertops can't be built or cut on site. They are made elsewhere and arrive ready to install.",
              "The lanes need protection when materials are unloaded, and trucks have to be covered. If a supplier spills cement or damages the paving, the administration can bar your contractor from the community and stop your work until it's repaired.",
              "A building stopped at the rough stage can be ordered to be finished or closed up on the outside.",
            ],
          },
          {
            type: "p",
            text: "A contractor who doesn't know these rules is a common reason for a remodel to stall here.",
          },
        ],
      },
      {
        heading: "What surprises buyers and owners",
        blocks: [
          {
            type: "ul",
            items: [
              "The HOA covers facades. In many communities it only looks after common areas. Here it also reviews your house's exterior.",
              "There is no active master developer. After the original developer's bankruptcy, nobody is building the pending phases. Vacant lots and unfinished buildings nearby belong to third parties with no announced plans.",
              "The hotel and golf course are separate. They operate independently from the HOA, and access to them isn't included in your HOA fees. Ask exactly what rights come with a property.",
              "Distance costs money. Loreto is a small town without large building-supply stores or a wide range of finishes and appliances. Most materials arrive by freight from La Paz or the mainland, and specialized trades often have to travel in.",
            ],
          },
        ],
      },
      {
        heading: "Mistakes I've seen",
        blocks: [
          {
            type: "ul",
            items: [
              "Buying a house to expand it or to rent it to large groups. Check the occupancy rules before you plan around rentals.",
              "Hiring a builder who hasn't read the community's site rules.",
              "Assuming Nopoló and Loreto Bay are the same thing, and assuming the amenities come with the address.",
              "Planning a remodel from abroad without someone local on site. In high season, good contractors are scarce, and running a remodel remotely without a supervisor rarely works.",
            ],
          },
        ],
      },
      {
        heading: "Before you remodel or expand",
        blocks: [
          {
            type: "ol",
            items: [
              "Get the current Design Guidelines and your area's rules from the HOA.",
              "Have the design reviewed against them before drawing details: lot coverage, height, privacy, materials and colors.",
              "Submit it to the Design Review Committee and wait for written approval.",
              "Only then take it to the municipality for the permit, with a DRO's signature. The [guide to permits and the DRO](/guides/building-permits-and-dro-in-loreto) lists what the municipality asks for.",
              "Choose a contractor who accepts the site rules in writing and has a local supervisor for the work.",
            ],
          },
        ],
      },
      {
        heading: "How I can help",
        blocks: [
          {
            type: "p",
            text: "The services that fit best here, in Loreto Bay and in the rest of Nopoló, are design and construction, and acting as your DRO. If you own or are considering a house here, send me the address and what you want to change. I'll tell you what the community's rules mean for it. If you live abroad, the [guide to building from abroad](/guides/building-a-home-in-loreto-from-abroad) explains how a project runs when you aren't here.",
          },
        ],
      },
    ],
  },
  {
    slug: "buying-land-in-loreto-what-to-check",
    title: "Buying land in Loreto: what I check before you sign",
    description:
      "Buying land in Loreto, Baja California Sur: the site analysis I run, the documents I gather and the local risks to check, from ejido land to drainage.",
    dek: "Land that looks like a bargain can carry costs you can't see from the listing. This is how I analyze a lot before a client commits, and what I've learned to check in Loreto in particular.",
    published: "2026-11-18",
    updated: "2026-11-18",
    sections: [
      {
        heading: "How I review a lot",
        blocks: [
          {
            type: "p",
            text: "The depth of the review depends on the land. A lot in an urbanized area needs a lighter check than rustic land with no services, where I run a full site analysis: a study of the site's current conditions and how they may change, from the lot itself out to its surroundings.",
          },
          {
            type: "p",
            text: "It looks at two kinds of information. Objective data exists whether or not anyone is there: boundaries, topography, soil, climate, utilities, hazards. Subjective data is what people experience on the site: views, privacy, noise, smells, how you get in and out.",
          },
        ],
      },
      {
        heading: "My five steps",
        blocks: [
          {
            type: "ol",
            items: [
              "Document review. Before going to the site I collect whatever already exists, from public sources or from you: surveys and aerial photos, the title and any easements or liens, zoning and development plans (including FONATUR or HOA rules where they apply), utility maps, soil or geology reports, and climate data.",
              "Site visit. I go to the land to confirm, correct and add to what the documents say, with a camera or phone, a drone, a tape or laser measure, and the documents in hand.",
              "Putting the data together. I mark findings on plans and maps, with notes, sketches and photos, and list the key points.",
              "Analysis. I work out what each finding means for the design: where the house can sit, how it faces the sun and wind, access, views, light and privacy.",
              "Presentation. The result can be a simple annotated site plan or a full report, depending on the project.",
            ],
          },
        ],
      },
      {
        heading: "What I look for on the lot",
        blocks: [
          {
            type: "ul",
            items: [
              "Boundaries and dimensions, topography and any slope or low spots.",
              "Soil and geology, existing vegetation and what should stay.",
              "Sun path, wind direction and the rain and drainage history of the area.",
              "Water, sewer, power and communications: what exists at the lot line and what doesn't.",
              "Hazards: flooding, drainage, storms and hurricanes, abandoned or unfinished buildings nearby.",
              "Neighbors and context: heights, uses, style, noise, views in and out.",
              "Access for people and vehicles.",
            ],
          },
        ],
      },
      {
        heading: "Loreto-specific things to check",
        blocks: [
          {
            type: "ul",
            items: [
              "Rain and drainage. Loreto has no storm-drain network, so in hurricane season or heavy rain some parts of town flood. In those areas the lot has to be raised.",
              "Zoning and ecological plans. Loreto has several urban and ecological planning instruments. Check that they allow the density and height you plan to build.",
              "Beachfront lots. Check whether the property has the ZOFEMAT concession next to it.",
              "Cleared rustic land. Find out whether the land was already cleared, and if so, whether it went through environmental impact review and land-use change. Clearing without the required permits can bring federal fines.",
              "Ejido land. Find out whether it has been properly released to become private property or is still restricted ejido land. This is a question for a lawyer.",
              "Subdivided ejido lots. They are being offered in Loreto, but these are subdivisions among ejido members, not subdivisions of private property. They weren't set up under the subdivision laws, so don't assume they have all their permits or that they are meant to be urbanized, or that the municipality or the government will provide services. Who will bring power, water, sewer and paving is unsettled. You can build on them, but you'll need permits without services, plus environmental impact review and a change from forest to urban land use.",
              "FONATUR lots. They look urbanized, but in many the infrastructure has deteriorated and needs repair. Sometimes water and sewer connection fees are still owed. Read the purchase contract carefully, including the fine print on lots FONATUR has already sold to third parties. A low price doesn't mean no extra costs.",
              "Next to Loreto Bay. FONATUR used to review and pre-approve plans in the area around Loreto Bay. Ask the municipality which restrictions apply there now.",
              "Inside Loreto Bay. The design guidelines, density limits and condominium rules are far more restrictive than anywhere else. See the [guide to building and remodeling in Loreto Bay](/guides/building-and-remodeling-in-loreto-bay).",
              "Downtown, the Malecón area and Colonia El Jaral. They are already urbanized, so they are a different case from rustic land.",
            ],
          },
          {
            type: "note",
            text: "I'm a builder and a DRO, not a lawyer. Title, ejido status, trusts and taxes belong with a notary or a lawyer.",
          },
        ],
      },
      {
        heading: "Before you put down a deposit",
        blocks: [
          {
            type: "p",
            text: "If you're still negotiating directly with the owner, bring in a registered real estate professional. Otherwise you can pay a deposit and then find unpaid property tax, water or other debts with the municipality, or find that the costs of buying the property weren't in your budget.",
          },
          {
            type: "p",
            text: "As a first step, I can handle the paperwork to obtain the certificates of no debt and of no liens. If you need something deeper, such as an appraisal or a more thorough negotiation with the owner, I can recommend registered appraisers and real estate agents.",
          },
        ],
      },
      {
        heading: "If the land already has a building",
        blocks: [
          {
            type: "p",
            text: "I can do a preliminary inspection of the structure, the installations, the waterproofing and how the house works overall, and tell you whether to negotiate the price for the repairs it needs. If you plan to demolish and build new, I can give you my opinion on that too.",
          },
        ],
      },
      {
        heading: "Send me the lot",
        blocks: [
          {
            type: "p",
            text: "If you're looking at a lot, send me its location and whatever documents you have before you sign anything. I'll tell you what I'd check and what could change your plans. When you're ready to build, the [guide to permits and the DRO](/guides/building-permits-and-dro-in-loreto) and the [guide to building from abroad](/guides/building-a-home-in-loreto-from-abroad) cover the next steps.",
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
