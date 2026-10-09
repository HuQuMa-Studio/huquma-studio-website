/* =============================================================
   Imágenes del portafolio (Vercel Blob) redimensionadas por la
   Image Optimization de Vercel (`/_vercel/image`, configurada en
   vercel.json → "images"). Solo en el build de producción: en dev
   local se usa la URL original del Blob.
   ============================================================= */

const BLOB_HOST = "phqqmyu6mg1hod6o.public.blob.vercel-storage.com";

// Deben coincidir con "sizes" y "qualities" de vercel.json
const WIDTHS = [640, 1080, 1920] as const;
const QUALITY = 70;

type Width = (typeof WIDTHS)[number];

function optimizable(url: string): boolean {
  return import.meta.env.PROD && url.startsWith(`https://${BLOB_HOST}/`);
}

export function imageSrc(url: string, width: Width): string {
  if (!optimizable(url)) return url;
  return `/_vercel/image?url=${encodeURIComponent(url)}&w=${width}&q=${QUALITY}`;
}

export function imageSrcSet(url: string): string | undefined {
  if (!optimizable(url)) return undefined;
  return WIDTHS.map((w) => `${imageSrc(url, w)} ${w}w`).join(", ");
}

// Valores de `sizes` para las grillas de 1 / 2 / 3 columnas del sitio
export const GRID_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";
