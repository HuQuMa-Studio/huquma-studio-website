/* =============================================================
   GuidesIndex — /guides. Lista de guías (data/guides.ts) con su
   descripción, fecha y tiempo de lectura.
   ============================================================= */

import { useEffect } from "react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { GUIDES, readingMinutes } from "@/data/guides";
import { GUIDES_DESCRIPTION, GUIDES_TITLE } from "@/lib/seo";
import { formatDate } from "./GuidePage";

export default function GuidesIndex() {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevTitle = document.title;
    const prevDesc = meta?.content ?? "";
    document.title = GUIDES_TITLE;
    if (meta) meta.content = GUIDES_DESCRIPTION;
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      if (meta) meta.content = prevDesc;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <header className="container pt-32 md:pt-40 pb-12 md:pb-16">
          <div className="section-number mb-3">Guides</div>
          <span className="gold-line" />
          <h1 className="font-display text-4xl md:text-6xl text-[#F5F0E8] leading-[1.05] max-w-3xl">
            Building in Loreto,<br />
            <span className="text-[#B8963E] italic">explained</span>
          </h1>
          <p className="text-[#C8C8C8] text-lg leading-relaxed max-w-2xl mt-6">
            Plain answers to what owners ask before they build: permits, the DRO, owning land near the coast,
            and running a project from another country.
          </p>
        </header>

        <div className="container pb-24">
          <ul className="border-t border-white/[0.08]">
            {GUIDES.map((g) => (
              <li key={g.slug} className="border-b border-white/[0.08]">
                <Link href={`/guides/${g.slug}`} className="group grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-4 lg:gap-16 py-10">
                  <h2 className="font-display text-3xl md:text-4xl text-[#F5F0E8] leading-tight group-hover:text-[#D4AF5A] transition-colors">
                    {g.title}
                  </h2>
                  <div>
                    <p className="text-[#C8C8C8] text-base leading-relaxed">{g.description}</p>
                    <p className="font-mono-custom text-[0.65rem] tracking-[0.18em] uppercase text-[#8A8A8A] mt-4">
                      Updated <time dateTime={g.updated}>{formatDate(g.updated)}</time>
                      <span aria-hidden="true" className="mx-2 text-[#4A4A4A]">·</span>
                      {readingMinutes(g)} min read
                    </p>
                    <span className="inline-block mt-4 text-sm text-[#D4AF5A]">Read the guide →</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
