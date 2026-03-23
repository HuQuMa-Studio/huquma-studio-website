/* =============================================================
   ServicesSection — HuQuMa Studio
   Design: Grid de tarjetas de servicios con fondo de planos
   - Imagen de fondo de blueprints con overlay oscuro
   - Grid 3 columnas de tarjetas con icono + título + descripción
   - Hover effect con borde dorado
   ============================================================= */

const SERVICES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663469050523/gfR56a3Q9yCfv9Uqrxh4gB/services_bg-6KeABq2EKfSu3wxs2etGKW.webp";

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    title: "Custom Builds",
    subtitle: "New Construction",
    description:
      "From the ground up — residential homes, commercial spaces, and custom properties designed and built to your exact specifications.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Architectural Design",
    subtitle: "Initial Design",
    description:
      "Complete architectural design services including floor plans, elevations, structural drawings, and permit-ready documentation.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    title: "Remodeling",
    subtitle: "Renovations & Additions",
    description:
      "Complete remodeling projects, property additions, kitchen and bathroom renovations, and structural modifications.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Project Management",
    subtitle: "Full Oversight",
    description:
      "Detailed project management from pre-construction planning through post-construction completion, ensuring quality and timeline compliance.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    title: "DRO Services",
    subtitle: "Director Responsable de Obra",
    description:
      "Licensed DRO services for proper project initiation, regulatory compliance, and official decommissioning of construction projects in BCS.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
      </svg>
    ),
    title: "Facilities Management",
    subtitle: "Ongoing Maintenance",
    description:
      "Ongoing facilities management services to maintain, operate, and optimize your property after construction is complete.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M7 12s1.5-3 5-3 5 3 5 3-1.5 3-5 3-5-3-5-3z"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      </svg>
    ),
    title: "Pool Installation",
    subtitle: "Aquatic Features",
    description:
      "Custom pool design and installation, from simple residential pools to elaborate aquatic features with fountains and water elements.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
      </svg>
    ),
    title: "Tiny Houses",
    subtitle: "Compact Living",
    description:
      "Innovative tiny house design and construction — efficient, sustainable, and beautifully crafted compact living solutions.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Sustainable Building",
    subtitle: "Energy Efficiency",
    description:
      "Specializing in energy-efficient construction techniques and sustainable building practices for environmentally responsible development.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={SERVICES_BG}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.12) saturate(0.5)" }}
        />
        <div className="absolute inset-0 bg-[#0D0D0D]/80" />
      </div>
      <div className="absolute inset-0 arch-grid-bg z-0 opacity-30" />

      <div className="relative z-10 container">
        {/* Header */}
        <div className="mb-16 reveal">
          <div className="section-number mb-3">02 — Services</div>
          <span className="gold-line" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] leading-tight">
              What I Build<br />
              <span className="text-[#B8963E] italic">& Deliver</span>
            </h2>
            <p className="text-[#6A6A6A] text-sm max-w-xs leading-relaxed">
              Comprehensive design and construction services for residential,
              commercial, and public projects throughout Baja California Sur.
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="service-card reveal"
              style={{ transitionDelay: `${(i % 3) * 80}ms` }}
            >
              <div className="text-[#B8963E] mb-4">{service.icon}</div>
              <div className="section-number mb-1">{service.subtitle}</div>
              <h3 className="font-display text-xl text-[#F5F0E8] mb-3">{service.title}</h3>
              <p className="text-[#6A6A6A] text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
