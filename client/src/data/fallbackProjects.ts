/* =============================================================
   Proyectos de respaldo — se usan cuando /api/projects no está
   disponible (dev local) o falla. En producción Notion manda.
   ============================================================= */

import type { Project } from "@/types/project";

const CASA_CATALANA =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/casa_catalana_f0ed1520.jpg";
const CASA_CABALLO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/casa_caballo_mar_d76237aa.jpg";
const PORTFOLIO_PLANNED =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/portfolio_planned-jWJhzyuBYpp7Sagu6cMu34.webp";

// Datos de respaldo: en desarrollo local (donde /api/projects no corre) y si
// la API falla (ver hooks/useProjects.ts).
export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "casa-riquelme",
    slug: "casa-riquelme",
    name: "Casa Riquelme",
    location: "Nopolo, BCS",
    type: "Residential",
    status: "past",
    year: "2007",
    image: "https://phqqmyu6mg1hod6o.public.blob.vercel-storage.com/portfolio/hero/casa_riquelme.webp",
    description:
      "A contemporary Loreto Bay residence with regional accents, a central courtyard, poolside outdoor living, and energy-efficient RSG-3D Panel construction.",
    descriptionFull: "",
    bedrooms: null,
    bathrooms: null,
    squareFeet: null,
    gallery: [],
    tags: ["Contemporary", "Sustainable"],
    planImage: "",
    buildImage: "https://phqqmyu6mg1hod6o.public.blob.vercel-storage.com/portfolio/gallery/casa-riquelme/casa_riquelme_framing.webp",
    featured: true,
  },
  {
    id: "casa-catalana",
    slug: "casa-catalana",
    name: "Casa Catalana",
    location: "Loreto, BCS",
    type: "Residential",
    status: "current",
    year: "2024–2025",
    image: CASA_CATALANA,
    description:
      "Large-scale residential construction project in the heart of Loreto. Foundation work completed with reinforced concrete structure. Featuring traditional Mexican colonial architecture with modern amenities.",
    descriptionFull: "",
    bedrooms: null,
    bathrooms: null,
    squareFeet: null,
    gallery: [],
    tags: ["Residential", "New Construction", "Colonial Style"],
    planImage: "",
    buildImage: "",
    featured: false,
  },
  {
    id: "casa-caballo-mar",
    slug: "casa-caballo-de-mar",
    name: "Casa Caballo de Mar",
    location: "Loreto, BCS",
    type: "Residential",
    status: "past",
    year: "2020–2022",
    image: CASA_CABALLO,
    description:
      "Landmark luxury residential villa featuring Mediterranean-inspired architecture, ornate stone work, lush tropical gardens, and a central fountain courtyard. A showcase of high-end construction in Loreto.",
    descriptionFull: "",
    bedrooms: null,
    bathrooms: null,
    squareFeet: null,
    gallery: [],
    tags: ["Luxury", "Mediterranean", "Completed"],
    planImage: "",
    buildImage: "",
    featured: false,
  },
  {
    id: "villa-cortez",
    slug: "villa-cortes",
    name: "Villa Cortés",
    location: "Loreto, BCS",
    type: "Residential",
    status: "planned",
    year: "2026",
    image: PORTFOLIO_PLANNED,
    description:
      "Upcoming luxury coastal villa with infinity pool overlooking the Sea of Cortez. Modern Mexican architecture with sustainable building practices and energy-efficient systems throughout.",
    descriptionFull: "",
    bedrooms: null,
    bathrooms: null,
    squareFeet: null,
    gallery: [],
    tags: ["Luxury", "Sustainable", "Coastal"],
    planImage: "",
    buildImage: "",
    featured: false,
  },
];
