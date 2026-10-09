/* =============================================================
   Preguntas frecuentes — fuente única para la sección (FaqSection) y
   para el JSON-LD FAQPage de la portada (lib/seo.ts): Google exige que
   lo marcado coincida con lo visible.
   Todo confirmado por Hugo (2026-10-09). Pendiente: rango de costo por
   m²/pie² para "How much does it cost…" (Hugo eligió publicarlo); hasta
   entonces la respuesta va sin cifras. Tiempos: Hugo pidió no dar cifras.
   ============================================================= */

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "Can I hire you for just one part of the project?",
    answer:
      "Yes. You can hire me for the design only, for the construction only, to oversee a build run by another contractor, or to look after a finished house. Or for the whole house, with one person answering for all of it.",
  },
  {
    question: "Do you handle the building permits in Loreto?",
    answer:
      "Yes. I prepare the permit set and take it through the municipality of Loreto myself. As a licensed DRO, I also sign the project.",
  },
  {
    question: "What is a DRO, and do I need one?",
    answer:
      "A DRO (Director Responsable de Obra) is the licensed professional who signs a construction project and answers for it meeting the building regulations. In Loreto, any build from 40 m² (about 430 sq ft) up to 500 m² (about 5,380 sq ft) needs a DRO's signature on the permit. Larger projects, and technically complex ones such as large commercial, industrial or public buildings, need a certified DRO.",
  },
  {
    question: "Can I build in Loreto while I live in the US or Canada?",
    answer:
      "Yes. I'm on site in Loreto and you follow the work from home: photos and video on WhatsApp, email reports with spending against the budget, video calls at the key milestones, and a 3D Matterport walkthrough of the house.",
  },
  {
    question: "How much does it cost to build a custom home in Loreto?",
    answer:
      "It depends on the size of the house, the finishes, the lot (slope, access, water and power) and extras such as a pool. Send me the lot location, the size and what you want to build, and I'll give you a first estimate.",
  },
  {
    question: "How long does it take to build a house?",
    answer:
      "It depends on your house. The project moves through three stages: the design and permit set, the municipality's review, and construction. Once the design is set, we plan the build together and you follow its progress in the reports.",
  },
  {
    question: "Can you check a lot or a house before I buy it?",
    answer: "Yes. I inspect the lot or the house and tell you what I find before you commit to the purchase.",
  },
  {
    question: "Who looks after the house when I'm not in Loreto?",
    answer:
      "I do: inspections, maintenance and repairs, hurricane preparation, utilities and predial (property tax), and the house ready between rental guests.",
  },
  {
    question: "Where do you work?",
    answer: "I'm based in Loreto and work throughout Baja California Sur.",
  },
  {
    question: "How do I get started?",
    answer:
      "Email me where the land is, the lot size, what you want to build or remodel, your ideal timeline, and whether you already have plans. I'll reply with the next steps.",
  },
];
