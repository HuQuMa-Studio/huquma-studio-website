/* =============================================================
   PortfolioSection — HuQuMa Studio
   Grid de proyectos con tabs por tipo de construcción ("Tipo" en
   Notion). Cada card es clickable y
   navega a /portfolio/:slug (la sub-página ProjectDetail).
   - Hover muestra descripción expandida + tags
   - Click en la card abre la sub-página del proyecto
   ============================================================= */

import { useState } from "react";
import { Link } from "wouter";
import StatusBadge from "@/components/StatusBadge";
import { useProjects } from "@/hooks/useProjects";
import { GRID_SIZES, imageSrc, imageSrcSet } from "@/lib/image";
import { projectMeta, projectTypes } from "@/types/project";

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { projects } = useProjects();

  // Una pestaña por tipo, solo si hay proyectos de ese tipo
  const tabs = [
    { label: "All Projects", value: "all" },
    ...projectTypes
      .filter((type) => projects.some((p) => p.type === type))
      .map((type) => ({ label: type, value: type })),
  ];

  const filtered =
    activeTab === "all"
      ? projects
      : projects.filter((p) => p.type === activeTab);

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-[#0D0D0D]">
      <div className="container">
        {/* Header */}
        <div className="mb-12 reveal">
          <div className="section-number mb-3">05 — Portfolio</div>
          <span className="gold-line" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] leading-tight">
              Selected
              <br />
              <span className="text-[#B8963E] italic">Work</span>
            </h2>
            <p className="text-[#828282] text-sm max-w-xs leading-relaxed">
              A selection of residential and commercial projects across Baja
              California Sur.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-10 reveal">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              aria-pressed={activeTab === tab.value}
              className={`px-5 py-3 text-xs tracking-widest uppercase font-mono-custom transition-all duration-200 ${
                activeTab === tab.value
                  ? "bg-[#B8963E] text-[#111111]"
                  : "bg-transparent border border-white/10 text-[#828282] hover:border-[#B8963E]/50 hover:text-[#B8963E]"
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
            >
              {/* Image */}
              <div className="relative" style={{ aspectRatio: "4/3" }}>
                <img
                  src={imageSrc(project.image, 1080)}
                  srcSet={imageSrcSet(project.image)}
                  sizes={GRID_SIZES}
                  alt={project.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="overlay" />

                {/* Status badge */}
                <div className="absolute top-4 left-4 z-10">
                  <StatusBadge status={project.status} />
                </div>
              </div>

              {/* Info: sobre la foto con mouse; debajo de la foto en táctil */}
              <div className="overlay-info">
                {projectMeta(project) && (
                  <div className="section-number mb-1">
                    {projectMeta(project)}
                  </div>
                )}
                <h3 className="font-display text-2xl text-[#F5F0E8] leading-tight">
                  {project.name}
                </h3>
                <div className="text-[#8A8A8A] text-xs mt-1 flex items-center gap-1">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {project.location}
                </div>

                {/* Descripción: con mouse aparece al pasar o enfocar; en táctil siempre visible */}
                <div className="card-more">
                  <p className="text-[#A0A0A0] text-xs leading-relaxed mt-3 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[0.65rem] px-2 py-0.5 border border-[rgb(160,160,160)] text-[rgb(160,160,160)] tracking-wider uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Note */}
        <p className="text-[#7A7A7A] text-xs text-center mt-8 font-mono-custom tracking-wide reveal">
          More projects available upon request — contact for full portfolio
        </p>
      </div>
    </section>
  );
}
