/* =============================================================
   Contacto — fuente única de los enlaces de email y WhatsApp.
   El objetivo del sitio es que el prospecto mande un EMAIL con los
   detalles de su terreno/proyecto (ver PRODUCT.md). WhatsApp queda
   como canal secundario.
   ============================================================= */

export const EMAIL = "hugo@huquma.studio";

export const PRIMARY_CTA_LABEL = "Start Your Project";

const EMAIL_SUBJECT = "New project in Loreto";

const EMAIL_BODY = [
  "Hi Hugo,",
  "",
  "I'd like to tell you about my project.",
  "",
  "Where is the land (area or address):",
  "Lot size:",
  "What I want to build or remodel:",
  "Ideal timeline:",
  "Do I already have plans or drawings:",
  "",
  "Thanks,",
  "",
].join("\n");

// mailto con asunto y una plantilla de preguntas; `context` agrega de qué
// proyecto del portafolio viene el prospecto (p. ej. "Casa Riquelme").
export function emailHref(context?: string): string {
  const subject = context ? `${EMAIL_SUBJECT} (seen: ${context})` : EMAIL_SUBJECT;
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(EMAIL_BODY)}`;
}

export const WHATSAPP_NUMBER = "+52 613 122 0058";

export const WHATSAPP_HREF =
  "https://wa.me/526131220058/?text=Hi%20Hugo%2C%20I%20would%20like%20to%20schedule%20a%20call%20with%20you%2C%20please%20let%20me%20know%20when%20are%20you%20available";

// Ficha de Google Business Profile (verificada 2026-10-09). GBP_URL abre la ficha en
// Maps (enlace corto de "Compartir"); GBP_CID_URL es la forma permanente para JSON-LD.
export const GBP_URL = "https://maps.app.goo.gl/pKysh7rp6MMPgxNA7";
export const GBP_CID_URL = "https://www.google.com/maps?cid=17949940045278024296";
