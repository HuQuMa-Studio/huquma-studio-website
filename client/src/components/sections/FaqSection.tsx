/* =============================================================
   FaqSection — preguntas frecuentes, entre Portafolio y Contacto
   (Hugo, 2026-10-09). Acordeón nativo (<details>): accesible sin JS y
   con todas las respuestas en el HTML pre-renderizado. Los textos viven
   en data/faq.ts y alimentan también el JSON-LD FAQPage (lib/seo.ts).
   ============================================================= */

import WhatsAppTextLink from "@/components/WhatsAppTextLink";
import { FAQS } from "@/data/faq";
import { PRIMARY_CTA_LABEL, emailHref } from "@/lib/contact";

export default function FaqSection() {
  return (
    <section id="faq" className="relative py-24 md:py-32 bg-[#0D0D0D]">
      <div className="container grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-12 lg:gap-20">
        {/* Header */}
        <div className="reveal lg:sticky lg:top-32 lg:self-start">
          <div className="section-number mb-3">06 — FAQ</div>
          <span className="gold-line" />
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-[#F5F0E8] leading-tight">
            What owners ask<br />
            <span className="text-[#B8963E] italic">before they write</span>
          </h2>
          <p className="text-[#C8C8C8] text-base leading-relaxed max-w-sm mt-6">
            If yours isn't here, ask me directly.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8">
            <a href={emailHref("FAQ")} className="btn-gold">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              {PRIMARY_CTA_LABEL}
            </a>
            <WhatsAppTextLink />
          </div>
        </div>

        {/* Preguntas */}
        <div className="reveal border-b border-white/[0.08]">
          {FAQS.map((faq, i) => (
            <details key={faq.question} className="faq-item group border-t border-white/[0.08]" open={i === 0}>
              <summary className="flex items-start justify-between gap-6 py-6 cursor-pointer list-none">
                <h3 className="font-display text-xl md:text-2xl text-[#F5F0E8] leading-snug group-hover:text-[#D4AF5A] transition-colors">
                  {faq.question}
                </h3>
                <span aria-hidden="true" className="faq-icon relative mt-2 h-3.5 w-3.5 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#B8963E]" />
                  <span className="faq-icon-v absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#B8963E]" />
                </span>
              </summary>
              <p className="text-[#C8C8C8] text-base leading-relaxed max-w-[62ch] pb-7 -mt-1">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
