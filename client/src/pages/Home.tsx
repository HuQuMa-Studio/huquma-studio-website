/* =============================================================
   Home Page — HuQuMa Studio [Design+Build]
   Design Philosophy: Modernismo Tectónico — Arquitectura como Interfaz
   
   Sections:
   1. Hero — Full-viewport con imagen de planos
   2. About — Presentación de Hugo + retrato
   3. Services — Grid de 9 servicios
   4. Experience — Estadísticas + timeline
   5. Portfolio — Proyectos con tabs
   6. Contact — Información de contacto
   7. Footer
   ============================================================= */

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
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
        <AboutSection />
        <ServicesSection />
        <ExperienceSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
