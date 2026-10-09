/* =============================================================
   HeroSection — "Del plano a la casa"
   Un proyecto contado en tres láminas reales: 01 Design (plano),
   02 Build (obra negra) y 03 Manage (casa terminada).
   - Proyectos: "Mostrar en Portada" + "Foto Obra URL" en Notion; abre
     siempre el de Orden menor. Sin "Foto Plano URL", la lámina 01 usa
     la foto de planos del estudio.
   - Cambio de proyecto solo manual (← →), con fundido; el siguiente se
     precarga al acercarse al control.
   - Desktop: láminas en columnas, titular sobre la casa terminada.
     Móvil/tablet: titular arriba y franja de tres láminas debajo.
   ============================================================= */

import { useState } from "react";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WhatsAppTextLink from "@/components/WhatsAppTextLink";
import { useProjects } from "@/hooks/useProjects";
import { PRIMARY_CTA_LABEL, emailHref } from "@/lib/contact";
import { imageSrc, imageSrcSet } from "@/lib/image";
import type { Project } from "@/types/project";

// Planos reales del estudio: lámina 01 cuando el proyecto no tiene su plano
const STUDIO_DRAWINGS = "/images/hero-cover-1080.webp";

const STAGE_SIZES = "(min-width: 1024px) 18vw, 25vw";
const FINISHED_SIZES = "(min-width: 1024px) 64vw, 50vw";

function preload(project: Project) {
  for (const [url, w] of [
    [project.image, 1920],
    [project.buildImage, 640],
    [project.planImage, 640],
  ] as const) {
    if (url) new Image().src = imageSrc(url, w);
  }
}

function StageCaption({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 p-3 lg:p-6 bg-gradient-to-t from-[#111111]/90 via-[#111111]/50 to-transparent">
      <div className="font-display text-2xl lg:text-5xl leading-none text-[#D4AF5A]">{n}</div>
      <div className="font-display text-base lg:text-2xl text-[#F5F0E8] mt-1">{title}</div>
      <p className="hidden lg:block text-[13px] leading-snug text-[#C8C8C8] mt-1">{text}</p>
    </div>
  );
}

export default function HeroSection() {
  const { projects } = useProjects();
  const featured = projects.filter((p) => p.featured && p.image && p.buildImage);
  const [index, setIndex] = useState(0);
  const project = featured.length ? featured[index % featured.length] : null;
  const count = featured.length;

  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  const preloadNeighbors = () => {
    if (count < 2) return;
    preload(featured[(index + 1) % count]);
    preload(featured[(index - 1 + count) % count]);
  };

  const planSrc = project?.planImage ? imageSrc(project.planImage, 640) : STUDIO_DRAWINGS;
  const planSrcSet = project?.planImage ? imageSrcSet(project.planImage) : undefined;

  return (
    <section
      id="hero"
      aria-label="From first sketch to finished house"
      className="relative flex flex-col lg:block bg-[#111111] pt-16 md:pt-20 lg:pt-0 lg:h-screen lg:min-h-[680px] overflow-hidden"
    >
      {/* Láminas: plano · obra · casa terminada */}
      <div className="relative grid grid-cols-[1fr_1fr_2fr] h-[46vh] min-h-[300px] md:h-[52vh] lg:absolute lg:inset-0 lg:top-20 lg:h-auto lg:grid-cols-[minmax(200px,18vw)_minmax(200px,18vw)_1fr] gap-px bg-white/10 order-2">
        <div className="relative overflow-hidden bg-[#1A1A1A]">
          <img
            key={`plan-${project?.id ?? "studio"}`}
            src={planSrc}
            srcSet={planSrcSet}
            sizes={STAGE_SIZES}
            alt={project?.planImage ? `${project.name} — design drawings` : "Architectural drawings by HuQuMa Studio"}
            className="stage-fade absolute inset-0 w-full h-full object-cover"
            style={project?.planImage ? undefined : { filter: "brightness(0.55) saturate(0.6)" }}
          />
          <StageCaption n="01" title="Design" text="Plans, elevations, structural drawings and permits." />
        </div>

        <div className="relative overflow-hidden bg-[#1A1A1A]">
          {project && (
            <img
              key={`build-${project.id}`}
              src={imageSrc(project.buildImage, 640)}
              srcSet={imageSrcSet(project.buildImage)}
              sizes={STAGE_SIZES}
              alt={`${project.name} under construction`}
              className="stage-fade absolute inset-0 w-full h-full object-cover"
            />
          )}
          <StageCaption n="02" title="Build" text="On site, start to finish, with DRO sign-off." />
        </div>

        <div className="relative overflow-hidden bg-[#1A1A1A]">
          {project && (
            <img
              key={`done-${project.id}`}
              src={imageSrc(project.image, 1920)}
              srcSet={imageSrcSet(project.image)}
              sizes={FINISHED_SIZES}
              fetchPriority={index === 0 ? "high" : undefined}
              alt={`${project.name}, finished`}
              className="stage-fade absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* Desktop: oscurece el lado del titular */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#111111]/95 via-[#111111]/60 to-transparent" />
          <div className="lg:hidden">
            <StageCaption n="03" title="Manage" text="" />
          </div>
          <div className="hidden lg:block absolute right-10 bottom-0 z-10 w-72 text-right p-6">
            <div className="font-display text-5xl leading-none text-[#D4AF5A]">03</div>
            <div className="font-display text-2xl text-[#F5F0E8] mt-1">Manage</div>
            <p className="text-[13px] leading-snug text-[#C8C8C8] mt-1">
              Facilities management after the keys, while you are away.
            </p>
          </div>
        </div>
      </div>

      {/* Titular + acción. Móvil: arriba de la franja; desktop: sobre la casa */}
      <div className="relative z-20 px-5 sm:px-8 pt-10 pb-8 lg:p-0 lg:absolute lg:top-20 lg:bottom-0 lg:left-[calc(2*max(200px,18vw)+4rem)] lg:right-[22rem] lg:flex lg:flex-col lg:justify-center -order-1">
        <h1 className="font-display text-[2.6rem] sm:text-5xl lg:text-6xl xl:text-7xl text-[#F5F0E8] leading-[1.02] max-w-xl">
          One person, from first sketch to{" "}
          <span className="text-[#B8963E]">finished house.</span>
        </h1>
        <p className="text-[#C8C8C8] text-base leading-relaxed max-w-md mt-5">
          I design it, I build it, and I keep caring for it when you're not in
          Loreto. In Baja California Sur since 1993.
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8">
          <a href={emailHref()} className="btn-gold">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            {PRIMARY_CTA_LABEL}
          </a>
          <WhatsAppTextLink />
        </div>

        {/* Proyecto mostrado + cambio manual */}
        {project && (
          <div
            className="mt-8 lg:mt-12 flex items-center gap-2 border-t border-white/10 pt-4"
            onMouseEnter={preloadNeighbors}
            onFocus={preloadNeighbors}
          >
            <Link
              href={`/portfolio/${project.slug}`}
              className="mr-auto py-2 text-[#C8C8C8] hover:text-[#D4AF5A] transition-colors"
            >
              <span aria-live="polite" className="font-display text-xl text-[#F5F0E8]">
                {project.name}
              </span>
              <span className="block font-mono-custom text-[11px] tracking-[0.15em] uppercase text-[#8A8A8A] mt-0.5">
                {[project.location, project.year].filter(Boolean).join(" · ")} · View project →
              </span>
            </Link>
            {count > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous project"
                  className="w-11 h-11 flex items-center justify-center border border-white/15 text-[#C8C8C8] hover:border-[#B8963E] hover:text-[#B8963E] transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="font-mono-custom text-[11px] tracking-[0.15em] text-[#8A8A8A] w-12 text-center">
                  {(index % count) + 1} / {count}
                </span>
                <button
                  onClick={() => go(1)}
                  aria-label="Next project"
                  className="w-11 h-11 flex items-center justify-center border border-white/15 text-[#C8C8C8] hover:border-[#B8963E] hover:text-[#B8963E] transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
