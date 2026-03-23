/* =============================================================
   ExperienceSection — HuQuMa Studio
   Design: Estadísticas animadas + timeline de trayectoria
   - Fondo con imagen de Loreto
   - Contadores animados de estadísticas clave
   - Timeline de hitos profesionales
   ============================================================= */

import { useEffect, useRef, useState } from "react";

const LORETO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/experience_bg-ANxTmw3XhhpWHdrucE8YP4.webp";

const stats = [
  { value: 30, suffix: "+", label: "Years of Experience" },
  { value: 100, suffix: "+", label: "Projects Completed" },
  { value: 1993, suffix: "", label: "Year Founded" },
  { value: 1, suffix: "", label: "Loreto, BCS" },
];

const timeline = [
  {
    period: "1993 — 2000",
    title: "Early Career & Foundation",
    description:
      "Began professional career in construction and architectural design in Baja California Sur. Established foundational expertise in residential construction and project coordination.",
  },
  {
    period: "2000 — 2010",
    title: "Commercial & Public Works",
    description:
      "Expanded into commercial construction and public infrastructure projects. Developed expertise in project management for large-scale developments throughout BCS.",
  },
  {
    period: "2010 — 2018",
    title: "Real Estate Development",
    description:
      "Diversified into real estate development, managing complete development cycles from land acquisition and design through construction and sale. Licensed as Director Responsable de Obra (DRO).",
  },
  {
    period: "2018 — 2022",
    title: "Sustainable Construction",
    description:
      "Specialized in energy-efficient and sustainable building practices. Completed landmark projects including Casa Caballo de Mar — a luxury Mediterranean-style villa in Loreto.",
  },
  {
    period: "2022 — Present",
    title: "HuQuMa Studio",
    description:
      "Established HuQuMa Studio [Design+Build] as a full-service design and construction practice. Currently managing Casa Catalana and expanding services throughout Baja California Sur.",
  },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  if (target === 1) {
    return (
      <div ref={ref} className="stat-number">
        Loreto
      </div>
    );
  }

  return (
    <div ref={ref} className="stat-number">
      {count}
      {suffix}
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-[#111111]">
      <div className="container">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-number mb-3">03 — Experience</div>
          <span className="gold-line" />
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] leading-tight">
            Three Decades of<br />
            <span className="text-[#B8963E] italic">Craftsmanship</span>
          </h2>
        </div>

        {/* Stats + Loreto image */}
        <div className="relative mb-20 overflow-hidden reveal">
          <div className="absolute inset-0 z-0">
            <img
              src={LORETO_BG}
              alt="Loreto, Baja California Sur"
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.25) saturate(0.7)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/60 to-[#111111]" />
          </div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/8">
            {stats.map((stat) => (
              <div key={stat.label} className="p-8 md:p-12 text-center">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                <div className="text-[#6A6A6A] text-xs tracking-widest uppercase mt-2 font-mono-custom">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-2xl">
          <h3 className="font-display text-2xl text-[#F5F0E8] mb-10 reveal">
            Professional Timeline
          </h3>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div
                key={item.period}
                className="timeline-item reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="font-mono-custom text-[0.7rem] text-[#B8963E] tracking-widest mb-1">
                  {item.period}
                </div>
                <h4 className="font-display text-xl text-[#F5F0E8] mb-2">{item.title}</h4>
                <p className="text-[#6A6A6A] text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
