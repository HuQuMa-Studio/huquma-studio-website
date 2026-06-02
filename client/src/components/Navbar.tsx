/* =============================================================
   Navbar — HuQuMa Studio
   Design: Modernismo Tectónico
   - Sticky header con fondo semi-transparente al hacer scroll
   - Logo isométrico + nombre de marca
   - Links de navegación con animación de subrayado dorado
   - CTA de contacto
   ============================================================= */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

const LOGO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/logo_956d778e.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // En sub-páginas (/portfolio/:slug) primero navegamos al home y luego scrolleamos
  // a la sección, porque las secciones (#about, #portfolio, etc.) viven en Home.
  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => scrollToSection(href), 100);
      return;
    }
    scrollToSection(href);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0F0F0F]/95 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="/"
              onClick={handleLogoClick}
              className="flex items-center gap-3 group"
            >
              <img
                src={LOGO_URL}
                alt="HuQuMa Studio Logo"
                className="w-9 h-9 md:w-10 md:h-10 object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
              <div className="hidden sm:block">
                <div className="text-[#F5F0E8] font-display text-lg leading-none tracking-wide">
                  HuQuMa Studio
                </div>
                <div className="text-[10px] tracking-[0.2em] text-[#B8963E] uppercase font-mono-custom mt-0.5">
                  Design + Build
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`nav-link text-sm font-medium tracking-wide transition-colors ${
                    activeSection === link.href.replace("#", "")
                      ? "text-[#D4AF5A] active"
                      : "text-[#8A8A8A] hover:text-[#F5F0E8]"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/526131220058/?text=Hi%20Hugo%2C%20I%20would%20like%20to%20schedule%20a%20call%20with%20you%2C%20please%20let%20me%20know%20when%20are%20you%20available"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex btn-gold text-xs py-2 px-4"
              >
                Schedule a Call →
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-[#8A8A8A] hover:text-[#F5F0E8] transition-colors p-1"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0F0F0F]/98 backdrop-blur-md transition-all duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="font-display text-3xl text-[#F5F0E8] hover:text-[#D4AF5A] transition-colors"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {link.label}
            </button>
          ))}
          <div className="mt-4 flex gap-4">
            <a href="https://wa.me/526131220058/?text=Hi%20Hugo%2C%20I%20would%20like%20to%20schedule%20a%20call%20with%20you%2C%20please%20let%20me%20know%20when%20are%20you%20available" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              Schedule a Call →
            </a>
            <a href="mailto:hugo@huquma.studio" className="btn-ghost">
              Email
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
