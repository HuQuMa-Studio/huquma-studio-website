/* =============================================================
   HeroSection — HuQuMa Studio
   Design: Full-viewport hero con imagen de planos arquitectónicos
   - Imagen de fondo con overlay oscuro
   - Logo + título centrado
   - Scroll indicator animado
   ============================================================= */

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/hero_cover_250c3d3c.jpg";
const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/logo_956d778e.png";

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
          alt="Architectural drawings and blueprints"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.35) saturate(0.6)" }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/60 via-transparent to-[#111111]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/30 via-transparent to-[#111111]/30" />
      </div>

      {/* Architectural grid texture */}
      <div className="absolute inset-0 z-0 arch-grid-bg opacity-40" />

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

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://wa.me/526131220058/?text=Hello%20World!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp Me
          </a>
          <a
            href="mailto:hugo@huquma.studio"
            className="btn-ghost"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            Email Me
          </a>
          <a
            href="https://loreto.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
            </svg>
            Loreto.com
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="text-[#8A8A8A] hover:text-[#B8963E] transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
}
