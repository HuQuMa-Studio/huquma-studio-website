/* =============================================================
   Lightbox — modal de imagen full-screen con navegación.
   - ESC: cerrar
   - ← / →: navegar entre imágenes
   - Click fuera de la imagen: cerrar
   - Bloquea scroll del body mientras está abierto
   ============================================================= */

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LightboxProps {
  images: string[];
  openIndex: number | null;
  onClose: () => void;
}

export default function Lightbox({ images, openIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(openIndex ?? 0);

  // Sincronizar índice cuando se abre desde una posición específica
  useEffect(() => {
    if (openIndex !== null) setIndex(openIndex);
  }, [openIndex]);

  // Atajos de teclado + lock de scroll mientras está abierto
  useEffect(() => {
    if (openIndex === null) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [openIndex, images.length, onClose]);

  if (openIndex === null || images.length === 0) return null;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 text-[#F5F0E8] hover:text-[#B8963E] transition-colors z-10 p-2"
        aria-label="Close gallery"
      >
        <X size={28} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 text-[#8A8A8A] text-xs font-mono-custom tracking-wider z-10">
        {index + 1} / {images.length}
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-4 md:left-8 text-[#F5F0E8] hover:text-[#B8963E] transition-colors z-10 p-2"
          aria-label="Previous image"
        >
          <ChevronLeft size={40} />
        </button>
      )}

      {/* Image */}
      <img
        src={images[index]}
        alt={`Photo ${index + 1}`}
        className="max-w-[90vw] max-h-[85vh] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-4 md:right-8 text-[#F5F0E8] hover:text-[#B8963E] transition-colors z-10 p-2"
          aria-label="Next image"
        >
          <ChevronRight size={40} />
        </button>
      )}
    </div>
  );
}
