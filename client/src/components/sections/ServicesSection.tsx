/* =============================================================
   ServicesSection — "Five services, one person"
   Una foto de obra real por servicio. Desktop (lg+): franja de cinco
   paneles verticales; el activo se abre (hover, foco o clic) y los
   demás quedan como bandas con el nombre en vertical. Debajo de lg:
   cinco tarjetas apiladas con todo el contenido visible.
   Servicios y formas de contratación confirmados por Hugo (2026-10-09).
   ============================================================= */

import { useState } from "react";
import { emailHref } from "@/lib/contact";
import { imageSrc, imageSrcSet } from "@/lib/image";

const BLOB = "https://phqqmyu6mg1hod6o.public.blob.vercel-storage.com/portfolio/gallery";

const WAYS_TO_HIRE = ["Design + Build", "Design only", "Build only", "Oversight", "Manage"];

type Service = {
  stage: "Design" | "Build" | "Manage";
  name: string;
  ask: string;
  body: string;
  types?: string[];
  image: string;
  alt: string;
  caption: string;
};

const services: Service[] = [
  {
    stage: "Design",
    name: "Architectural & engineering design",
    ask: "Email me about a design",
    body: "Plans, elevations, structural and engineering drawings, and the permit set. I take the permits through the municipality myself.",
    image: "/images/hero-cover-1080.webp",
    alt: "Architectural drawings on the HuQuMa Studio drafting table",
    caption: "Studio drawings",
  },
  {
    stage: "Build",
    name: "Construction",
    ask: "Email me about a build",
    body: "New custom homes, remodels and additions, from the foundation to the finishes.",
    types: ["Custom homes", "Remodels & additions", "Pools", "Tiny houses", "Energy-efficient building"],
    image: `${BLOB}/casa-danzante/1_foundation_casa_danzante.webp`,
    alt: "Crew pouring the foundation slab of Casa Danzante",
    caption: "Casa Danzante · foundation",
  },
  {
    stage: "Build",
    name: "DRO services",
    ask: "Email me about DRO",
    body: "Licensed Director Responsable de Obra in Baja California Sur. I sign and answer for my own projects, and I take the DRO role on other builders' projects too.",
    image: `${BLOB}/casa-riquelme/casa_riquelme_shootcrete.webp`,
    alt: "Shotcrete shell of Casa Riquelme under construction",
    caption: "Casa Riquelme · shell",
  },
  {
    stage: "Manage",
    name: "Project management",
    ask: "Email me about oversight",
    body: "I represent you on a build run by another contractor and keep the schedule, budget and quality in check. I can also inspect a house or lot before you buy it.",
    image: `${BLOB}/villa-linda-mar/3_ecoresort_villalindamar_tridipanel_system.webp`,
    alt: "Panel wall system going up at Villa Linda Mar",
    caption: "Villa Linda Mar · panel system",
  },
  {
    stage: "Manage",
    name: "Facilities management",
    ask: "Email me about house care",
    body: "While you're away I look after the house: inspections, maintenance and repairs, hurricane prep, utilities and predial, and the house ready between rental guests.",
    image: `${BLOB}/villa-linda-mar/1_ecoresort_villalindamar_finished_villas_Poolside.webp`,
    alt: "Finished villas and pool at Villa Linda Mar",
    caption: "Villa Linda Mar · finished",
  },
];

// Construction abre por defecto: es el servicio que más buscan los dueños de casa
const DEFAULT_OPEN = 1;

export default function ServicesSection() {
  const [open, setOpen] = useState(DEFAULT_OPEN);

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#0D0D0D] overflow-hidden">
      {/* Header */}
      <div className="container mb-14 lg:mb-16 reveal">
        <div className="section-number mb-3">03 — Services</div>
        <span className="gold-line" />
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] leading-tight">
            Five services,<br />
            <span className="text-[#B8963E] italic">one person</span>
          </h2>
          <div className="lg:text-right max-w-xl">
            <p className="text-[#C8C8C8] text-base leading-relaxed">
              Hire me for one of them or for the whole house. Every photo below is
              one of my own sites.
            </p>
            <ul className="mt-3 flex flex-wrap lg:justify-end gap-x-3 gap-y-1 font-mono-custom text-[0.65rem] tracking-[0.14em] uppercase text-[#D4AF5A]">
              {WAYS_TO_HIRE.map((way, i) => (
                <li key={way} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="text-[#4A4A4A]">/</span>}
                  {way}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Franja de fotos */}
      <ul className="flex flex-col gap-px bg-[#0D0D0D] lg:flex-row lg:h-[600px] reveal">
        {services.map((service, i) => {
          const isOpen = i === open;
          const panelId = `service-panel-${i}`;
          return (
            <li
              key={service.name}
              onMouseEnter={() => setOpen(i)}
              className="service-panel relative overflow-hidden lg:min-w-0"
              data-open={isOpen}
            >
              {/* Foto */}
              <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:absolute lg:inset-0 lg:aspect-auto">
                <img
                  src={imageSrc(service.image, 1080)}
                  srcSet={imageSrcSet(service.image)}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  alt={service.alt}
                  loading="lazy"
                  decoding="async"
                  className="service-photo absolute inset-0 w-full h-full object-cover"
                />
                <div className="service-shade absolute inset-0" />
                <div className="service-caption absolute right-5 top-4 lg:right-7 lg:top-5 font-mono-custom text-[0.65rem] tracking-[0.2em] uppercase text-[#F5F0E8]/75">
                  {service.caption}
                </div>
              </div>

              {/* Banda cerrada (solo desktop): botón con el nombre en vertical */}
              <button
                type="button"
                onClick={() => setOpen(i)}
                onFocus={() => setOpen(i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="service-tab hidden lg:flex absolute inset-0 items-end justify-start p-6 text-left"
              >
                <span className="service-tab-label flex items-center gap-4">
                  <span className="section-number">{service.stage}</span>
                  <span className="font-display text-[1.75rem] leading-none text-[#F5F0E8] whitespace-nowrap">
                    {service.name}
                  </span>
                </span>
              </button>

              {/* Contenido: siempre visible en móvil; en desktop solo el panel abierto */}
              <div
                id={panelId}
                className="service-body relative px-5 sm:px-8 pt-6 pb-10 lg:absolute lg:left-10 lg:right-10 lg:bottom-10 lg:p-0 xl:right-24"
              >
                <div className="section-number">{service.stage}</div>
                <h3 className="font-display text-4xl lg:text-5xl leading-[1.02] text-[#F5F0E8] mt-2 mb-4 lg:max-w-xl">
                  {service.name}
                </h3>
                <p className="text-[#C8C8C8] lg:text-[#D8D2C6] text-base leading-relaxed max-w-[34rem]">
                  {service.body}
                </p>
                {service.types && (
                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono-custom text-[0.65rem] tracking-[0.14em] uppercase text-[#C8C8C8]">
                    {service.types.map((type, t) => (
                      <li key={type} className="flex items-center gap-3">
                        {t > 0 && <span aria-hidden="true" className="text-[#B8963E]">·</span>}
                        {type}
                      </li>
                    ))}
                  </ul>
                )}
                <a
                  href={emailHref(service.name)}
                  className="inline-block mt-5 text-sm text-[#D4AF5A] underline-offset-4 hover:underline focus-visible:underline"
                >
                  {service.ask} →
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
