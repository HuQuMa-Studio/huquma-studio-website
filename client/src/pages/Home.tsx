/* =============================================================
   Home Page — HuQuMa Studio [Design+Build]
   Design Philosophy: Modernismo Tectónico — Arquitectura como Interfaz
   
   Sections:
   1. Hero — "Del plano a la casa": plano · obra · casa terminada
   2. Process — "How I work while you're away" (proceso a distancia)
   3. About — Presentación de Hugo + retrato
   4. Services — Grid de 9 servicios
   5. Experience — Estadísticas + timeline
   6. Portfolio — Proyectos con tabs
   7. FAQ — Preguntas frecuentes (data/faq.ts, también JSON-LD FAQPage)
   8. Contact — Información de contacto
   9. Footer
   ============================================================= */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProcessSection from "@/components/sections/ProcessSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  // Initialize scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe all reveal elements
    const elements = document.querySelectorAll(".reveal, .reveal-left");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />
      <main>
        <HeroSection />
        <ProcessSection />
        <AboutSection />
        <ServicesSection />
        <ExperienceSection />
        <PortfolioSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
