/* =============================================================
   SEO — fuente única de títulos, descripciones y datos estructurados
   (JSON-LD). La usan el pre-render del build (scripts/prerender.ts,
   vía entry-server) y ProjectDetail en el navegador, para que el HTML
   que lee Google y la pestaña del navegador digan lo mismo.
   Solo datos confirmados por Hugo (ver PRODUCT.md / CLAUDE.md).
   ============================================================= */

import { FAQS } from "@/data/faq";
import type { Guide } from "@/data/guides";
import { EMAIL, WHATSAPP_NUMBER } from "@/lib/contact";
import type { Project } from "@/types/project";

export const HOME_TITLE = "Custom Home Design & Build in Loreto, Baja California Sur | HuQuMa Studio";
export const HOME_DESCRIPTION =
  "Custom homes in Loreto, BCS, designed, built and managed by one person: Hugo Quintero, licensed DRO, building in Baja California Sur since 1993.";

const SAME_AS = [
  "https://web.facebook.com/profile.php?id=100083097284323",
  "https://www.youtube.com/channel/UC9lKXLcmQcWI2kj7-JdQhog",
];

const SERVICES: { name: string; description: string }[] = [
  {
    name: "Architectural & engineering design",
    description: "Plans, elevations, structural and engineering drawings, and the permit set, filed with the municipality.",
  },
  {
    name: "Construction",
    description: "New custom homes, remodels and additions, pools, tiny houses and energy-efficient building.",
  },
  {
    name: "DRO services",
    description: "Licensed Director Responsable de Obra in Baja California Sur, for Hugo's own projects and for other builders' projects.",
  },
  {
    name: "Project management",
    description: "Owner's representative on builds run by other contractors, and inspection of a house or lot before purchase.",
  },
  {
    name: "Facilities management",
    description: "Inspections, maintenance and repairs, hurricane preparation, utilities and property tax, and vacation-rental care while owners are away.",
  },
];

export function projectTitle(p: Pick<Project, "name" | "location">): string {
  return `${p.name}${p.location ? `, ${p.location}` : ""} | HuQuMa Studio`;
}

export function projectDescription(p: Pick<Project, "name" | "description" | "descriptionFull" | "location">): string {
  const text = (p.description || p.descriptionFull || "").trim();
  const base = text || `${p.name}, a project by HuQuMa Studio in ${p.location || "Baja California Sur"}.`;
  return base.length > 160 ? `${base.slice(0, 157).replace(/\s+\S*$/, "")}…` : base;
}

function businessId(site: string) {
  return `${site}/#business`;
}

function personId(site: string) {
  return `${site}/#hugo`;
}

// Igual que en Contacto y llms.txt (NAP idéntico en todos lados)
const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Calle Ayuntamiento SN, Col. Centro",
  addressLocality: "Loreto",
  addressRegion: "Baja California Sur",
  postalCode: "23880",
  addressCountry: "MX",
};

export function homeJsonLd(site: string, projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: `${site}/`,
        name: "HuQuMa Studio",
        inLanguage: "en",
        publisher: { "@id": businessId(site) },
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": businessId(site),
        name: "HuQuMa Studio",
        alternateName: "HuQuMa Studio [Design+Build]",
        slogan: "Design + Build + Manage",
        description: HOME_DESCRIPTION,
        url: `${site}/`,
        image: `${site}/images/og-cover.jpg`,
        logo: `${site}/images/logo-192.png`,
        email: EMAIL,
        telephone: WHATSAPP_NUMBER.replace(/\s+/g, ""),
        address: ADDRESS,
        hasMap: "https://maps.app.goo.gl/S7WH5v3PYp88xq6j7",
        areaServed: [
          { "@type": "City", name: "Loreto, Baja California Sur" },
          { "@type": "State", name: "Baja California Sur" },
        ],
        knowsLanguage: ["en", "es"],
        founder: { "@id": personId(site) },
        sameAs: SAME_AS,
        makesOffer: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.description, areaServed: "Baja California Sur" },
        })),
        subjectOf: projects.map((p) => ({ "@id": `${site}/portfolio/${p.slug}#project` })),
      },
      {
        // Visible en la sección FAQ de la portada (mismos textos, data/faq.ts)
        "@type": "FAQPage",
        "@id": `${site}/#faq`,
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@type": "Person",
        "@id": personId(site),
        name: "Hugo Quintero Maldonado",
        jobTitle: "Design-build professional and licensed DRO (Director Responsable de Obra)",
        worksFor: { "@id": businessId(site) },
        homeLocation: { "@type": "City", name: "Loreto, Baja California Sur" },
        image: `${site}/images/hugo-portrait.webp`,
        knowsLanguage: ["en", "es"],
        knowsAbout: ["Custom home construction", "Architectural design", "Director Responsable de Obra", "Facilities management", "Baja California Sur"],
      },
    ],
  };
}

export function projectJsonLd(site: string, p: Project) {
  const url = `${site}/portfolio/${p.slug}`;
  const images = [p.image, ...p.gallery].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: p.name,
        url,
        description: projectDescription(p),
        image: images,
        ...(p.year ? { dateCreated: p.year } : {}),
        ...(p.tags.length ? { keywords: p.tags.join(", ") } : {}),
        genre: p.type,
        locationCreated: {
          "@type": "Place",
          name: p.location,
          address: { "@type": "PostalAddress", addressLocality: p.location, addressRegion: "Baja California Sur", addressCountry: "MX" },
        },
        creator: { "@id": businessId(site) },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
          { "@type": "ListItem", position: 2, name: "Portfolio", item: `${site}/#portfolio` },
          { "@type": "ListItem", position: 3, name: p.name, item: url },
        ],
      },
    ],
  };
}

// ---------- Guías (/guides) ----------

export const GUIDES_TITLE = "Guides to building a home in Loreto, BCS | HuQuMa Studio";
export const GUIDES_DESCRIPTION =
  "Plain answers about building a custom home in Loreto, Baja California Sur: permits, the DRO, owning land near the coast and building while you live abroad.";

export function guideTitle(g: Pick<Guide, "title">): string {
  return `${g.title} | HuQuMa Studio`;
}

export function guidesIndexJsonLd(site: string, guides: Guide[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${site}/guides#page`,
        url: `${site}/guides`,
        name: "Guides to building a home in Loreto, BCS",
        description: GUIDES_DESCRIPTION,
        publisher: { "@id": businessId(site) },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: guides.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${site}/guides/${g.slug}`,
            name: g.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${site}/guides` },
        ],
      },
    ],
  };
}

export function guideJsonLd(site: string, g: Guide) {
  const url = `${site}/guides/${g.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: g.title,
        description: g.description,
        url,
        mainEntityOfPage: url,
        inLanguage: "en",
        datePublished: g.published,
        dateModified: g.updated,
        image: `${site}/images/og-cover.jpg`,
        author: {
          "@type": "Person",
          "@id": personId(site),
          name: "Hugo Quintero Maldonado",
          jobTitle: "Design-build professional and licensed DRO (Director Responsable de Obra)",
          url: `${site}/#about`,
        },
        publisher: {
          "@type": "Organization",
          "@id": businessId(site),
          name: "HuQuMa Studio",
          url: `${site}/`,
          logo: { "@type": "ImageObject", url: `${site}/images/logo-192.png` },
        },
        about: { "@type": "Place", name: "Loreto, Baja California Sur, Mexico" },
        articleSection: g.sections.map((s) => s.heading),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${site}/guides` },
          { "@type": "ListItem", position: 3, name: g.title, item: url },
        ],
      },
    ],
  };
}
