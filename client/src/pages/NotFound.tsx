/* =============================================================
   NotFound — ruta desconocida. El pre-render la genera como 404.html,
   que Vercel sirve con estado 404 (ya no hay catch-all que devuelva 200).
   Enlaces <a> normales: recarga completa, así "/#portfolio" sí baja a la
   sección (el router de wouter ignora el hash).
   ============================================================= */

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#111111] flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center">
        <div className="container py-40">
          <div className="section-number mb-3">404</div>
          <span className="gold-line" />
          <h1 className="font-display text-5xl md:text-6xl text-[#F5F0E8] leading-tight max-w-2xl">
            This page isn't on the plans.
          </h1>
          <p className="text-[#C8C8C8] text-base leading-relaxed max-w-md mt-6">
            The address may have changed, or the project is no longer published.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 mt-10 text-sm">
            <a href="/" className="text-[#D4AF5A] underline-offset-4 hover:underline">
              Go to the home page →
            </a>
            <a href="/#portfolio" className="text-[#D4AF5A] underline-offset-4 hover:underline">
              See the portfolio →
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
