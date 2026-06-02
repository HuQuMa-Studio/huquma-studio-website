/**
 * upload-to-blob.ts — sube imágenes locales a Vercel Blob Storage.
 *
 * Uso:
 *   pnpm upload-blob <carpeta> [--prefix=ruta/]
 *
 * Ejemplo:
 *   pnpm upload-blob ~/Downloads/huquma-hero --prefix=portfolio/hero/
 *
 * Requiere BLOB_READ_WRITE_TOKEN en .env.local (cargado por --env-file en el
 * script de npm). Se obtiene del dashboard de Vercel → Storage → tu Blob Store.
 */

import { put } from "@vercel/blob";
import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join } from "node:path";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function parseArgs() {
  const args = process.argv.slice(2);
  const folder = args.find((a) => !a.startsWith("--"));
  const prefixArg = args.find((a) => a.startsWith("--prefix="));
  const prefix = prefixArg ? prefixArg.replace("--prefix=", "") : "";
  return { folder, prefix };
}

async function main() {
  const { folder, prefix } = parseArgs();

  if (!folder) {
    console.error(
      "Uso: pnpm upload-blob <carpeta> [--prefix=ruta/]\n" +
        "Ejemplo: pnpm upload-blob ~/Downloads/huquma-hero --prefix=portfolio/hero/",
    );
    process.exit(1);
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    console.error(
      "❌ BLOB_READ_WRITE_TOKEN no está disponible.\n" +
        "   Verifica que .env.local exista y contenga el token.",
    );
    process.exit(1);
  }

  // Validar que la carpeta existe
  try {
    const stats = await stat(folder);
    if (!stats.isDirectory()) {
      console.error(`❌ ${folder} no es una carpeta.`);
      process.exit(1);
    }
  } catch {
    console.error(`❌ La carpeta no existe: ${folder}`);
    process.exit(1);
  }

  const all = await readdir(folder);
  const images = all
    .filter((f) => IMAGE_EXTS.has(extname(f).toLowerCase()))
    .sort();

  if (images.length === 0) {
    console.error(`⚠️  No se encontraron imágenes en ${folder}`);
    process.exit(0);
  }

  console.log(`📤 Subiendo ${images.length} imagen(es) a Vercel Blob`);
  console.log(`   Carpeta:  ${folder}`);
  console.log(`   Prefijo:  ${prefix || "(raíz)"}`);
  console.log(`   Token:    ${token.length} chars, empieza con "${token.slice(0, 20)}..."\n`);

  const results: Array<{ filename: string; url: string }> = [];
  let failures = 0;

  for (const filename of images) {
    const filepath = join(folder, filename);
    const buffer = await readFile(filepath);
    const blobPath = prefix + filename;

    try {
      const blob = await put(blobPath, buffer, {
        access: "public",
        token,
        // addRandomSuffix=true por defecto: cada subida genera URL único.
        // Si quieres URLs predecibles (sobrescribir), agrega: addRandomSuffix: false
      });
      results.push({ filename, url: blob.url });
      console.log(`✅ ${filename}`);
      console.log(`   → ${blob.url}\n`);
    } catch (err) {
      failures++;
      const e = err as Error & { code?: string; status?: number };
      console.error(`❌ ${filename}: ${e.message}`);
      console.error(`   error type: ${e.constructor.name}`);
      if (e.code) console.error(`   code: ${e.code}`);
      if (e.status) console.error(`   status: ${e.status}`);
      // Volcar todas las propiedades del error por si hay info adicional
      const props = Object.getOwnPropertyNames(err).filter(
        (p) => !["message", "stack", "code", "status"].includes(p),
      );
      if (props.length > 0) {
        const extra: Record<string, unknown> = {};
        for (const p of props) extra[p] = (err as Record<string, unknown>)[p];
        console.error(`   extra:`, JSON.stringify(extra));
      }
      console.error("");
    }
  }

  // Resumen final con formato fácil de copiar
  console.log("───────────────────────────────────────────────");
  console.log(`✨ ${results.length}/${images.length} subidas exitosas`);
  if (failures > 0) console.log(`⚠️  ${failures} fallaron`);
  if (results.length > 0) {
    console.log("\nCopia estos URLs al campo 'Foto Hero URL' en Notion:\n");
    for (const { filename, url } of results) {
      console.log(`${filename}:`);
      console.log(`  ${url}\n`);
    }
  }
}

main().catch((err) => {
  console.error("\n❌ Error inesperado:", err);
  process.exit(1);
});
