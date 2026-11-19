# Monitoreo de competidores — HuQuMa Studio

Registro vivo. Cada revisión se agrega con fecha. Fuente: DataForSEO (Labs: ranked
keywords y domain rank overview; SERP en vivo). Hugo irá pasando más competidores.

## Competidores en seguimiento
| Competidor | Sitio | Qué es |
|---|---|---|
| Saul Ramirez Builder | saulramirezbuilder.com | Firma boutique de lujo, llave en mano (FF&E), Danzante Bay; multipágina; testimonios con nombre; sin WhatsApp visible |
| JH Design Build | jhdes.com | Gana la ficha de Maps para "custom home builder loreto mexico" (5 reseñas, 5.0) |

## Revisión 2026-11-20
**Contexto:** Gemini afirmó que Saul Ramirez tiene "mejor visibilidad semántica" por sus
rutas (/about, /services, /projects, /testimonials). Se verificó con datos.

- **saulramirezbuilder.com:** DataForSEO no devuelve ninguna palabra clave posicionada
  (EE. UU. ni Canadá) y el resumen de dominio sale vacío. Visibilidad orgánica medible = 0
  en esa base. (Mexico: la herramienta devolvió error de parámetro; repetir si hace falta.)
- **huquma.studio:** también vacío (el dominio lleva días migrado; esperado).
- **jhdes.com:** 1 sola palabra clave posicionada: "jh design build" (50 búsquedas/mes,
  posición 64, su propio nombre). Tampoco tiene huella orgánica real; su ventaja está en la
  ficha de Maps con reseñas.
- **SERP "custom home builder loreto mexico" (EE. UU.):** el top orgánico lo ocupan YouTube,
  Airbnb, Ocean Home Magazine, Facebook, BajaNomad y Houzz; ni Saul Ramirez ni HuQuMa
  aparecen en la primera página. Ficha de Maps (knowledge graph): JH Design Build.
  Búsquedas relacionadas: "...reviews", "...for sale", "...cost".

**Conclusión:** la afirmación de Gemini no se sostiene con datos. Hoy ningún constructor de
Loreto tiene tráfico orgánico medible por búsquedas de constructor; la competencia real
está en Maps (reseñas) y en contenido informativo. Oportunidad: reseñas en la ficha de Google,
guías y testimonios.

## Cómo repetir
1. `dataforseo_labs_google_ranked_keywords` con `target` = dominio (probar United States,
   Canada; `location_name: Mexico` dio error de `language_code`).
2. `dataforseo_labs_google_domain_rank_overview` para tráfico estimado.
3. `serp_organic_live_advanced` para "custom home builder loreto mexico" y las búsquedas
   relacionadas; anotar quién sale en Maps y orgánico.
4. Re-medir en 4–8 semanas (el dominio de huquma.studio necesita tiempo).
