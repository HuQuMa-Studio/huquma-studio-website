/* =============================================================
   WhatsAppTextLink — canal secundario de contacto.
   Enlace de texto discreto bajo el CTA principal de email.
   ============================================================= */

import { WHATSAPP_HREF } from "@/lib/contact";

export default function WhatsAppTextLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block py-2 text-xs tracking-wide text-[#8A8A8A] hover:text-[#D4AF5A] transition-colors ${className}`}
    >
      Prefer WhatsApp?{" "}
      <span className="underline underline-offset-4 decoration-white/20">Message me</span>
    </a>
  );
}
