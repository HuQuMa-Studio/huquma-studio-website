// Avisa a Bing (y otros buscadores con IndexNow) de las URLs del sitio.
// Google NO usa IndexNow. Uso: pnpm indexnow            (todas las URLs del sitemap)
//                              pnpm indexnow <url> ...   (solo esas URLs)
// La llave pública vive en client/public/<KEY>.txt (debe estar desplegada antes de correr esto).
const HOST = "huquma.studio";
const KEY = "67fbc130dd0a5e69f928206c7c7cbcc0";

async function urlsFromSitemap(): Promise<string[]> {
  const res = await fetch(`https://${HOST}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml respondió ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length ? args : await urlsFromSitemap();

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
});

console.log(`IndexNow: ${res.status} ${res.statusText} (${urlList.length} URLs)`);
if (res.status >= 300) process.exit(1);
