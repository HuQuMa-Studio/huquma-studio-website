/* =============================================================
   HeroSection — HuQuMa Studio
   Design: Full-viewport hero con imagen de planos arquitectónicos
   - Imagen de fondo con overlay oscuro
   - Logo + título centrado
   - Indicador de scroll (estático, sin rebote)
   ============================================================= */

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import WhatsAppTextLink from "@/components/WhatsAppTextLink";
import { PRIMARY_CTA_LABEL, emailHref } from "@/lib/contact";

const HERO_IMAGE = "/images/hero-cover-1920.webp";
const HERO_SRCSET = "/images/hero-cover-1080.webp 1080w, /images/hero-cover-1920.webp 1920w";
const LOGO_URL = "/images/logo-192.webp";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          srcSet={HERO_SRCSET}
          sizes="100vw"
          width={1920}
          height={1440}
          fetchPriority="high"
          alt="Architectural drawings and blueprints"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.35) saturate(0.6)" }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/60 via-transparent to-[#111111]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/30 via-transparent to-[#111111]/30" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={LOGO_URL}
            alt="HuQuMa Studio"
            width={96}
            height={96}
            className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-2xl"
            style={{ filter: "brightness(0.9) contrast(1.1)" }}
          />
        </div>

        {/* Section label */}
        <div className="section-number mb-4">Loreto, Baja California Sur, México</div>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#F5F0E8] mb-4 leading-none">
          HuQuMa Studio
        </h1>
        <div className="font-display text-2xl md:text-3xl lg:text-4xl text-[#B8963E] italic mb-6">
          [Design+Build]
        </div>

        {/* Subtitle */}
        <p className="text-[#8A8A8A] text-sm md:text-base max-w-md mx-auto mb-10 leading-relaxed font-light tracking-wide">
          30+ years of experience in residential & commercial construction,
          public works, and real estate development.
        </p>

        {/* CTA: email es la acción principal; WhatsApp, secundaria */}
        <div className="flex flex-col items-center gap-3">
          <a href={emailHref()} className="btn-gold">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            {PRIMARY_CTA_LABEL}
          </a>
          <WhatsAppTextLink />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="w-11 h-11 flex items-center justify-center text-[#8A8A8A] hover:text-[#B8963E] transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
}
