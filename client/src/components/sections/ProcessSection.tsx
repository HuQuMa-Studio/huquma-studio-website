/* =============================================================
   ProcessSection — "How I work while you're away"
   Proceso a distancia para dueños que viven fuera de Loreto.
   Retoma las tres láminas de la portada (Design · Build · Manage).
   Todo lo que dice salió de Hugo (2026-10-09): no agregar plazos,
   frecuencias ni testimonios que él no haya confirmado.
   ============================================================= */

import { Link } from "wouter";
import WhatsAppTextLink from "@/components/WhatsAppTextLink";
import { PRIMARY_CTA_LABEL, emailHref } from "@/lib/contact";

const steps = [
  {
    stage: "Design",
    title: "Plans and permits",
    body: [
      "I design and engineer the full drawing set (architectural, structural, electrical, plumbing and HVAC) and manage the permits.",
      "As DRO, I review, sign and stamp the plans, check the site, log progress, enforce codes and sign off on completion, assuming all liabilities.",
    ],
  },
  {
    stage: "Build",
    title: "Construction you can follow",
    body: [
      "Design-build gives you a single point of contact, so you never play middleman between architects, contractors and subcontractors. The result is clear costs, better communication and a shorter timeline.",
      "You follow it from home: photos and video on WhatsApp, email reports of spend against budget, video calls at key milestones, and a 3D Matterport walkthrough of the house.",
    ],
  },
  {
    stage: "Manage",
    title: "Care after the keys",
    body: [
      "I keep looking after the house while you're away: regular inspections, maintenance and repairs, opening it before you arrive and closing it when you leave, and storm preparation before and after hurricanes.",
      "I also track and coordinate your property tax (predial) and your electricity, water and sewer bills.",
    ],
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-14 sm:py-16 md:py-20 bg-[#0D0D0D]">
      <div className="container">
        {/* Header */}
        <div className="mb-10 md:mb-12 reveal">
          <div className="section-number mb-3">01 — Building from abroad</div>
          <span className="gold-line" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] leading-tight">
              How I work<br />
              <span className="text-[#B8963E] italic">while you're away</span>
            </h2>
            <p className="text-[#C8C8C8] text-base max-w-md leading-relaxed">
              If you live in the US or Canada, you can run your whole project from
              home. I'm on site in Loreto, and you deal with one person for the
              plans, the permits, the budget and the house itself.
            </p>
          </div>
        </div>

        {/* Steps */}
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {steps.map((step, i) => (
            <li
              key={step.stage}
              className="bg-[#0D0D0D] p-8 lg:p-10 reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-display text-5xl leading-none text-[#D4AF5A]">
                0{i + 1}
              </div>
              <div className="section-number mt-4 mb-1">{step.stage}</div>
              <h3 className="font-display text-2xl text-[#F5F0E8] mb-4">{step.title}</h3>
              {step.body.map((p) => (
                <p key={p} className="text-[#A8A8A8] text-sm leading-relaxed mb-3 last:mb-0">
                  {p}
                </p>
              ))}
            </li>
          ))}
        </ol>

        {/* CTA */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-12 reveal">
          <a href={emailHref()} className="btn-gold">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            {PRIMARY_CTA_LABEL}
          </a>
          <WhatsAppTextLink />
          <div className="flex flex-wrap gap-x-6 gap-y-1 sm:ml-auto">
            <Link href="/guides/design-build-process-in-loreto" className="tap text-sm text-[#D4AF5A] underline-offset-4 hover:underline">
              How design-build works →
            </Link>
            <Link href="/guides/building-a-home-in-loreto-from-abroad" className="tap text-sm text-[#D4AF5A] underline-offset-4 hover:underline">
              Guide to building from abroad →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
