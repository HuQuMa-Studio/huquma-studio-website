/* =============================================================
   GuidePage — /guides/:slug (contenido en data/guides.ts)
   Página de lectura: columna de ~68 caracteres, índice lateral en
   desktop, autor y fecha visibles (E-E-A-T), CTA de correo al final y
   enlace a las demás guías. El pre-render pone title/description/
   canonical/JSON-LD; aquí se repiten title/description al navegar.
   ============================================================= */

import { useEffect } from "react";
import { Link, useParams } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WhatsAppTextLink from "@/components/WhatsAppTextLink";
import { GUIDES, guideBySlug, readingMinutes, type GuideBlock } from "@/data/guides";
import { PRIMARY_CTA_LABEL, emailHref } from "@/lib/contact";
import { guideTitle } from "@/lib/seo";
import NotFound from "./NotFound";

// "[texto](/ruta)" → enlace interno; el resto, texto tal cual
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? (
          <Link key={i} href={m[2]} className="text-[#D4AF5A] underline underline-offset-4 decoration-[#D4AF5A]/40 hover:decoration-[#D4AF5A]">
            {m[1]}
          </Link>
        ) : (
          part
        );
      })}
    </>
  );
}

export function anchorId(heading: string): string {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[m - 1]} ${d}, ${y}`;
}

function Block({ block }: { block: GuideBlock }) {
  if (block.type === "p") {
    return (
      <p className="text-[#D8D2C6] text-[1.0625rem] leading-[1.75] mb-5">
        <RichText text={block.text} />
      </p>
    );
  }
  if (block.type === "note") {
    return (
      <aside className="my-7 border border-white/10 bg-[#161616] px-6 py-5">
        <div className="section-number mb-2">Note</div>
        <p className="text-[#C8C8C8] text-base leading-relaxed">
          <RichText text={block.text} />
        </p>
      </aside>
    );
  }
  const Tag = block.type;
  return (
    <Tag className="mb-6 space-y-3">
      {block.items.map((item, i) => (
        <li key={item} className="flex gap-4 text-[#D8D2C6] text-[1.0625rem] leading-[1.7]">
          <span aria-hidden="true" className="font-mono-custom text-[0.65rem] text-[#B8963E] pt-[0.5rem] min-w-[1.25rem]">
            {block.type === "ol" ? String(i + 1).padStart(2, "0") : "—"}
          </span>
          <span>
            <RichText text={item} />
          </span>
        </li>
      ))}
    </Tag>
  );
}

export default function GuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = guideBySlug(slug);

  useEffect(() => {
    if (!guide) return;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevTitle = document.title;
    const prevDesc = meta?.content ?? "";
    document.title = guideTitle(guide);
    if (meta) meta.content = guide.description;
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      if (meta) meta.content = prevDesc;
    };
  }, [guide]);

  if (!guide) return <NotFound />;

  const others = GUIDES.filter((g) => g.slug !== guide.slug);

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />
      <main>
        <article>
          {/* Encabezado */}
          <header className="container pt-32 md:pt-40 pb-12 md:pb-16">
            <nav aria-label="Breadcrumb" className="font-mono-custom text-[0.65rem] tracking-[0.2em] uppercase text-[#8A8A8A] mb-6">
              <Link href="/" className="hover:text-[#D4AF5A]">Home</Link>
              <span aria-hidden="true" className="mx-2 text-[#4A4A4A]">/</span>
              <Link href="/guides" className="hover:text-[#D4AF5A]">Guides</Link>
            </nav>
            <span className="gold-line" />
            <h1 className="font-display text-4xl md:text-6xl text-[#F5F0E8] leading-[1.05] max-w-4xl">
              {guide.title}
            </h1>
            <p className="text-[#C8C8C8] text-lg md:text-xl leading-relaxed max-w-2xl mt-6">{guide.dek}</p>
            <p className="font-mono-custom text-[0.65rem] tracking-[0.18em] uppercase text-[#8A8A8A] mt-8 leading-loose">
              By <span className="text-[#C8C8C8]">Hugo Quintero Maldonado</span>, licensed DRO in Baja California Sur
              <span aria-hidden="true" className="mx-2 text-[#4A4A4A]">·</span>
              Updated <time dateTime={guide.updated}>{formatDate(guide.updated)}</time>
              <span aria-hidden="true" className="mx-2 text-[#4A4A4A]">·</span>
              {readingMinutes(guide)} min read
            </p>
          </header>

          {/* Cuerpo + índice */}
          <div className="container grid grid-cols-1 lg:grid-cols-[220px_minmax(0,68ch)] gap-12 lg:gap-20 border-t border-white/[0.08] pt-12 md:pt-16 pb-20">
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-32">
                <div className="section-number mb-4">On this page</div>
                <ol className="space-y-3 border-l border-white/[0.08] pl-5">
                  {guide.sections.map((s) => (
                    <li key={s.heading}>
                      <a href={`#${anchorId(s.heading)}`} className="text-sm text-[#8A8A8A] hover:text-[#D4AF5A] leading-snug block">
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div>
              {guide.sections.map((s) => (
                <section key={s.heading} id={anchorId(s.heading)} className="scroll-mt-28 mb-12 last:mb-0">
                  <h2 className="font-display text-3xl md:text-4xl text-[#F5F0E8] leading-tight mb-6">{s.heading}</h2>
                  {s.blocks.map((b, i) => (
                    <Block key={i} block={b} />
                  ))}
                </section>
              ))}

              {/* CTA */}
              <div className="mt-16 border-t border-white/[0.08] pt-10">
                <h2 className="font-display text-3xl text-[#F5F0E8] leading-tight">Planning a house in Loreto?</h2>
                <p className="text-[#C8C8C8] text-base leading-relaxed mt-4 max-w-xl">
                  Email me where the land is, the lot size and what you want to build. I'll reply with the next steps.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8">
                  <a href={emailHref(`Guide: ${guide.title}`)} className="btn-gold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    {PRIMARY_CTA_LABEL}
                  </a>
                  <WhatsAppTextLink />
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Otras guías */}
        {others.length > 0 && (
          <section aria-labelledby="more-guides" className="bg-[#0D0D0D] py-20">
            <div className="container">
              <h2 id="more-guides" className="section-number mb-8">More guides</h2>
              <ul className="border-t border-white/[0.08]">
                {others.map((g) => (
                  <li key={g.slug} className="border-b border-white/[0.08]">
                    <Link href={`/guides/${g.slug}`} className="group flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 py-7">
                      <span className="font-display text-2xl md:text-3xl text-[#F5F0E8] group-hover:text-[#D4AF5A] transition-colors">
                        {g.title}
                      </span>
                      <span className="text-sm text-[#D4AF5A] whitespace-nowrap">Read the guide →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
