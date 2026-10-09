/* =============================================================
   Lightbox — modal de imagen full-screen con navegación.
   - ESC: cerrar · ← / →: navegar · deslizar (touch): navegar
   - Click fuera de la imagen: cerrar
   - Foco: entra al abrir, queda atrapado dentro (Tab) y regresa al
     elemento que lo abrió al cerrar
   - Pie de foto opcional por imagen (`captions`)
   - Bloquea scroll del body mientras está abierto
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { imageSrc, imageSrcSet } from "@/lib/image";

interface LightboxProps {
  images: string[];
  captions?: (string | null)[];
  title?: string;
  openIndex: number | null;
  onClose: () => void;
}

const SWIPE_MIN = 50; // px horizontales para contar como deslizamiento

export default function Lightbox({ images, captions, title, openIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(openIndex ?? 0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  // Sincronizar índice cuando se abre desde una posición específica
  useEffect(() => {
    if (openIndex !== null) setIndex(openIndex);
  }, [openIndex]);

  // Atajos de teclado, foco atrapado y lock de scroll mientras está abierto
  useEffect(() => {
    if (openIndex === null) return;

    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
      opener?.focus();
    };
  }, [openIndex, images.length, onClose]);

  if (openIndex === null || images.length === 0) return null;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const caption = captions?.[index] ?? null;

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    swiped.current = false;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current || images.length < 2) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) >= SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true; // evita que el click que sigue cierre el visor
      if (dx < 0) next();
      else prev();
    }
  };

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center"
      onClick={() => {
        if (swiped.current) {
          swiped.current = false;
          return;
        }
        onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} gallery` : "Image gallery"}
    >
      {/* Close button */}
      <button
        ref={closeRef}
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-6 right-6 text-[#F5F0E8] hover:text-[#B8963E] focus-visible:text-[#B8963E] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#B8963E] transition-colors z-10 p-2"
        aria-label="Close gallery"
      >
        <X size={28} />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 text-[#8A8A8A] text-xs font-mono-custom tracking-wider z-10" aria-live="polite">
        {index + 1} / {images.length}
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-2 md:left-8 text-[#F5F0E8] hover:text-[#B8963E] focus-visible:text-[#B8963E] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#B8963E] transition-colors z-10 p-2"
          aria-label="Previous image"
        >
          <ChevronLeft size={40} />
        </button>
      )}

      {/* Image + caption */}
      <figure className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={imageSrc(images[index], 1920)}
          srcSet={imageSrcSet(images[index])}
          sizes="90vw"
          alt={caption ? `${title ? `${title}: ` : ""}${caption}` : `${title ? `${title} ` : ""}photo ${index + 1}`}
          className="max-w-[92vw] md:max-w-[90vw] max-h-[80vh] object-contain"
        />
        {caption && (
          <figcaption className="mt-4 px-6 text-center font-mono-custom text-[0.65rem] tracking-[0.2em] uppercase text-[#C8C8C8]">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-2 md:right-8 text-[#F5F0E8] hover:text-[#B8963E] focus-visible:text-[#B8963E] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#B8963E] transition-colors z-10 p-2"
          aria-label="Next image"
        >
          <ChevronRight size={40} />
        </button>
      )}
    </div>
  );
}
