/* =============================================================
   PortfolioSection — HuQuMa Studio
   Grid de proyectos con tabs de filtro. Cada card es clickable y
   navega a /portfolio/:slug (la sub-página ProjectDetail).
   - Hover muestra descripción expandida + tags
   - Click en la card abre la sub-página del proyecto
   ============================================================= */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import type { Project, ProjectStatus } from "@/types/project";
import { statusColors, statusLabels } from "@/types/project";

const CASA_CATALANA =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/casa_catalana_f0ed1520.jpg";
const CASA_CABALLO =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/casa_caballo_mar_d76237aa.jpg";
const PORTFOLIO_PLANNED =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/portfolio_planned-jWJhzyuBYpp7Sagu6cMu34.webp";

// Datos de respaldo: se muestran de inmediato y en desarrollo local
// (donde /api/projects no está disponible). En producción, Notion los reemplaza.
const FALLBACK_PROJECTS: Project[] = [
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
  },
  {
    id: "casa-caballo-mar",
    slug: "casa-caballo-de-mar",
    name: "Casa Caballo de Mar",
    location: "Loreto, BCS",
    type: "Luxury Residential",
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
  },
];

const tabs: { label: string; value: ProjectStatus | "all" }[] = [
  { label: "All Projects", value: "all" },
  { label: "In Progress", value: "current" },
  { label: "Completed", value: "past" },
  { label: "Upcoming", value: "planned" },
];

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<ProjectStatus | "all">("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((data: Project[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {
        // Sin conexión a Notion (dev local): se mantienen los datos de respaldo
      });
  }, []);

  const filtered =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.status === activeTab);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#0D0D0D]">
      <div className="container">
        {/* Header */}
        <div className="mb-12 reveal">
          <div className="section-number mb-3">04 — Portfolio</div>
          <span className="gold-line" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] leading-tight">
              Projects<br />
              <span className="text-[#B8963E] italic">Portafolio</span>
            </h2>
            <p className="text-[#6A6A6A] text-sm max-w-xs leading-relaxed">
              A selection of residential and commercial projects across
              Baja California Sur.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-10 reveal">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2 text-xs tracking-widest uppercase font-mono-custom transition-all duration-200 ${
                activeTab === tab.value
                  ? "bg-[#B8963E] text-[#111111]"
                  : "bg-transparent border border-white/10 text-[#6A6A6A] hover:border-[#B8963E]/50 hover:text-[#B8963E]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={`/portfolio/${project.slug}`}
              className="project-card block"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative" style={{ aspectRatio: "4/3" }}>
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="overlay" />

                {/* Status badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] tracking-widest uppercase font-mono-custom"
                    style={{
                      background: `${statusColors[project.status]}DD`,
                      border: `1px solid #FFFFFF`,
                      color: `#FFFFFF`,
                    }}
                  >
                    {statusLabels[project.status]}
                  </span>
                </div>

                {/* Info overlay */}
                <div className="overlay-info">
                  <div className="section-number mb-1">{project.type} · {project.year}</div>
                  <h3 className="font-display text-2xl text-[#F5F0E8] leading-tight">
                    {project.name}
                  </h3>
                  <div className="text-[#8A8A8A] text-xs mt-1 flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {project.location}
                  </div>

                  {/* Expanded description on hover */}
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: hoveredId === project.id ? "120px" : "0" }}
                  >
                    <p className="text-[#A0A0A0] text-xs leading-relaxed mt-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] px-2 py-0.5 border border-[rgb(160,160,160)] text-[rgb(160,160,160)] tracking-wider uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Note */}
        <p className="text-[#4A4A4A] text-xs text-center mt-8 font-mono-custom tracking-wide reveal">
          More projects available upon request — contact for full portfolio
        </p>
      </div>
    </section>
  );
}
