// /robots.txt (vía rewrite en vercel.json). Dinámico para que la línea
// Sitemap apunte al dominio que se esté usando.

import type { VercelRes } from "./_notion.js";

export default function handler(
  req: { headers: Record<string, string | string[] | undefined> },
  res: VercelRes,
) {
  const host = String(req.headers["x-forwarded-host"] ?? req.headers.host ?? "");
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400");
  res.status(200).send(`User-agent: *\nAllow: /\n\nSitemap: https://${host}/sitemap.xml\n`);
}
