/* =============================================================
   ProjectDetail — sub-página de cada proyecto del portafolio.
   Ruta: /portfolio/:slug

   Layout (mismo lenguaje visual del resto del sitio):
   - Breadcrumb: HuQuMa Studio / Portfolio / Project Name
   - Hero image full-width con status badge + título
   - Descripción completa (fallback a Descripción Corta si está vacía)
   - Specifications (Bedrooms · Bathrooms · Square Feet) — solo si tienen valor
   - Galería en grid (3 cols desktop) con Lightbox al hacer clic
   - "Back to Portfolio" — navega a / y scrollea a #portfolio
   ============================================================= */

import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import Navbar from "@/components/Navbar";
import type { Project } from "@/types/project";
import { statusColors, statusLabels } from "@/types/project";

export default function ProjectDetail() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const [, setLocation] = useLocation();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data: Project[]) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  // Scroll al tope al cambiar de proyecto
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const goToPortfolio = () => {
    setLocation("/");
    // Pequeño delay para dejar que Home se monte antes del scroll
    setTimeout(() => {
      document
        .getElementById("portfolio")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Loading: solo el Navbar mientras carga (típicamente <1s)
  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111]">
        <Navbar />
      </div>
    );
  }

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#111111] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6 py-32">
          <div className="text-center">
            <div className="section-number mb-3">404</div>
            <h1 className="font-display text-4xl md:text-5xl text-[#F5F0E8] mb-6">
              Project not found
            </h1>
            <p className="text-[#6A6A6A] text-sm mb-8 max-w-md mx-auto">
              The project "{slug}" doesn't exist in our portfolio. It may have
              been renamed or removed.
            </p>
            <button onClick={goToPortfolio} className="btn-gold inline-flex">
              ← Back to Portfolio
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Fallback: si la descripción larga está vacía, usamos la corta
  const desc = project.descriptionFull?.trim() || project.description;

  // Stats: solo mostrar las que tienen valor (Option A)
  const stats = [
    { label: "Bedrooms", value: project.bedrooms },
    { label: "Bathrooms", value: project.bathrooms },
    {
      label: "Square Feet",
      value:
        project.squareFeet != null ? project.squareFeet.toLocaleString() : null,
    },
  ].filter((s) => s.value != null && s.value !== "");

  const hasGallery = project.gallery && project.gallery.length > 0;

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      <main className="pt-20 md:pt-24">
        {/* Breadcrumb */}
        <div className="container py-5">
          <nav
            aria-label="Breadcrumb"
            className="text-[10px] tracking-[0.2em] uppercase font-mono-custom text-[#6A6A6A] flex flex-wrap items-center gap-2"
          >
            <button
              onClick={() => setLocation("/")}
              className="hover:text-[#B8963E] transition-colors"
            >
              HuQuMa Studio
            </button>
            <span className="text-[#4A4A4A]">/</span>
            <button
              onClick={goToPortfolio}
              className="hover:text-[#B8963E] transition-colors"
            >
              Portfolio
            </button>
            <span className="text-[#4A4A4A]">/</span>
            <span className="text-[#F5F0E8]">{project.name}</span>
          </nav>
        </div>

        {/* Hero */}
        <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 container py-10 md:py-16">
            <div className="mb-4">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] tracking-widest uppercase font-mono-custom"
                style={{
                  background: `${statusColors[project.status]}DD`,
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                }}
              >
                {statusLabels[project.status]}
              </span>
            </div>
            <div className="section-number mb-3">
              {project.type} · {project.year}
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-[#F5F0E8] leading-none mb-4">
              {project.name}
            </h1>
            <div className="text-[#8A8A8A] text-sm flex items-center gap-1.5">
              <svg
                width="12"
                height="12"
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
          </div>
        </div>

        {/* Description + Specifications */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              <div className="lg:col-span-2">
                <div className="section-number mb-3">About the Project</div>
                <span className="gold-line" />
                <p className="text-[#A0A0A0] text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {desc}
                </p>

                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-10">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-3 py-1 border border-[rgb(160,160,160)] text-[rgb(160,160,160)] tracking-wider uppercase font-mono-custom"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {stats.length > 0 && (
                <aside>
                  <div className="section-number mb-3">Specifications</div>
                  <span className="gold-line" />
                  <dl className="space-y-0">
                    {stats.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-baseline justify-between border-b border-white/5 py-4"
                      >
                        <dt className="text-[#6A6A6A] text-xs uppercase tracking-wider font-mono-custom">
                          {s.label}
                        </dt>
                        <dd className="text-[#F5F0E8] font-display text-2xl md:text-3xl">
                          {s.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              )}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="pb-16 md:pb-24">
          <div className="container">
            <div className="section-number mb-3">Gallery</div>
            <span className="gold-line" />

            {hasGallery ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
                {project.gallery.map((url, i) => (
                  <button
                    key={url + i}
                    onClick={() => setLightboxIndex(i)}
                    className="relative bg-[#1A1A1A] aspect-[4/3] overflow-hidden group"
                    aria-label={`View photo ${i + 1}`}
                  >
                    <img
                      src={url}
                      alt={`${project.name} photo ${i + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="border border-white/5 bg-[#1A1A1A]/30 py-16 px-6 text-center">
                <p className="text-[#6A6A6A] text-sm font-mono-custom tracking-wide">
                  More photos coming soon
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Back to portfolio */}
        <section className="pb-20">
          <div className="container">
            <button onClick={goToPortfolio} className="btn-gold inline-flex">
              ← Back to Portfolio
            </button>
          </div>
        </section>
      </main>

      <Footer />

      <Lightbox
        images={project.gallery || []}
        openIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
      />
    </div>
  );
}
