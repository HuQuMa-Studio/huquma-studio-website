/* =============================================================
   Pie de foto a partir del nombre del archivo en Blob.
   Hugo nombra las fotos de forma descriptiva (CLAUDE.md, workflow 2),
   así que "caballo_mar_main_entrance.webp" → "Main entrance".
   Se quitan el número de orden, la extensión y las palabras del nombre
   del proyecto. Si no queda nada útil, devuelve null.
   ============================================================= */

const STOP_WORDS = new Set(["casa", "villa", "ecoresort", "hero", "img", "dsc", "photo", "foto", "de", "del", "la", "el"]);

function normalize(word: string): string {
  return word.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function photoCaption(url: string, projectName: string): string | null {
  const file = decodeURIComponent(url.split("/").pop() ?? "").replace(/\.[a-z0-9]+$/i, "");
  const nameWords = normalize(projectName).split(/[^a-z0-9]+/).filter(Boolean);
  const skip = new Set([...nameWords, nameWords.join("")]);

  const words = file
    .split(/[_\-\s]+/)
    .map(normalize)
    .filter((w) => w && !/^\d+$/.test(w) && !skip.has(w) && !STOP_WORDS.has(w));

  if (words.length === 0) return null;

  // Siglas cortas sin vocales en mayúsculas (bbq → BBQ)
  const text = words.map((w) => (w.length <= 3 && !/[aeiou]/.test(w) ? w.toUpperCase() : w)).join(" ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}
