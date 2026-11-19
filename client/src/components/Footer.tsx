/* =============================================================
   Footer — HuQuMa Studio
   Design: Footer minimalista con logo, copyright y redes sociales
   ============================================================= */

import { useLocation } from "wouter";

const LOGO_URL = "/images/logo-192.webp";

// Orden de lectura en 2 filas x 4 columnas (grid de 4 columnas, fila por fila)
const navLinks = [
  { label: "How I Work", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Guides", href: "/guides" },
  { label: "FAQ", href: "#faq" },
  { label: "Experience", href: "#experience" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
  { label: "About", href: "#about" },
];

export default function Footer() {
  const [location, setLocation] = useLocation();

  // En sub-páginas, primero navega al home y luego scrollea (las secciones
  // viven en Home, no en /portfolio/:slug).
  const handleClick = (href: string) => {
    // Rutas propias (p. ej. /guides): navegar y subir al inicio
    if (href.startsWith("/")) {
      setLocation(href);
      window.scrollTo(0, 0);
      return;
    }
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="container py-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-8 mb-4 md:mb-6">
          {/* Logo + brand */}
          <div className="flex items-center gap-3">
            <img
              src={LOGO_URL}
              alt="HuQuMa Studio"
              width={40}
              height={40}
              loading="lazy"
              className="w-10 h-10 object-contain opacity-70"
            />
            <div>
              <div className="font-display text-base text-[#F5F0E8] leading-none">
                HuQuMa Studio
              </div>
              <div className="text-[0.65rem] tracking-[0.25em] text-[#B8963E] uppercase font-mono-custom mt-0.5">
                Design + Build + Manage
              </div>
            </div>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer" className="grid grid-cols-4 gap-x-2 sm:gap-x-8 md:gap-x-10">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="tap py-3 text-left whitespace-nowrap text-[0.65rem] sm:text-xs text-[#7A7A7A] hover:text-[#B8963E] transition-colors tracking-normal sm:tracking-wide uppercase font-mono-custom"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-4" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[#7A7A7A] text-xs font-mono-custom tracking-wide">
            © 2026 HuQuMa Studio [Design+Build]. All rights reserved.
          </p>
          <p className="text-[#7A7A7A] text-xs font-mono-custom tracking-wide">
            Designed & Made in Mexico with ♥ by{" "}
            <a
              href="https://www.loreto.com/hq/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#B8963E] underline underline-offset-2 decoration-[#B8963E]/50 hover:decoration-[#B8963E] transition-colors"
            >
              HuQuMa
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
