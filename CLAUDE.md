# HuQuMa Studio [Design+Build] — Codebase Documentation

**Sitio web oficial de Hugo Quintero Maldonado — Design + Build + Manage**  
📍 Loreto, Baja California Sur, México

---

## 📋 Descripción General

Sitio web **estático** profesional construido con **React 19 + Vite + Tailwind CSS 4**. Presenta los servicios, experiencia de 30+ años y portafolio de proyectos de HuQuMa Studio.

**Nota**: El sitio fue originalmente desarrollado con **Manus AI** y fue guardado en GitHub, ahora en desarrollo local.

### Secciones del sitio
- **Hero**: Imagen de portada con planos arquitectónicos, logo y CTAs de contacto
- **About**: Presentación de Hugo Quintero Maldonado con retrato y credenciales
- **Services**: Grid de 9 servicios (construcción, diseño, remodelación, DRO, etc.)
- **Experience**: Estadísticas animadas y timeline de trayectoria profesional (1993–presente)
- **Portfolio**: Proyectos con filtros: Current / Past / Planned
- **Contact**: Información de contacto, dirección y redes sociales

---

## 🛠 Stack Tecnológico

| Tecnología | Detalles |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **Routing** | Wouter |
| **Fuentes** | Cormorant Garamond + DM Sans + JetBrains Mono (Google Fonts) |
| **Icons** | Lucide React + SVG inline |

---

## 📁 Estructura del Proyecto

```
huquma-studio-website/
├── client/
│   ├── index.html                    # HTML principal con metadatos y fuentes
│   ├── public/                       # Archivos estáticos (favicon, robots.txt)
│   └── src/
│       ├── App.tsx                   # Router y ThemeProvider
│       ├── index.css                 # Tokens de diseño y estilos globales
│       ├── main.tsx                  # Punto de entrada React
│       ├── components/
│       │   ├── Navbar.tsx            # Navegación sticky con menú móvil
│       │   ├── Footer.tsx            # Footer con logo y redes sociales
│       │   └── sections/
│       │       ├── HeroSection.tsx       # Sección hero
│       │       ├── AboutSection.tsx      # Sección about
│       │       ├── ServicesSection.tsx   # Sección servicios
│       │       ├── ExperienceSection.tsx # Sección experiencia
│       │       ├── PortfolioSection.tsx  # Sección portafolio
│       │       └── ContactSection.tsx    # Sección contacto
│       ├── hooks/
│       │   └── useScrollReveal.ts    # Hook de animaciones scroll
│       └── pages/
│           └── Home.tsx              # Página principal
├── dist/                             # Build de producción (generado)
│   └── public/                       # Archivos para subir por FTP
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🎨 Filosofía de Diseño

**Modernismo Tectónico — Arquitectura como Interfaz**

### Principios Core:
1. La interfaz refleja el proceso constructivo: de los planos a la obra terminada
2. Jerarquía visual basada en peso y masa, no en color
3. Espaciado generoso que "respira" como un plano bien trazado
4. Autenticidad: imágenes reales del trabajo dominan sobre elementos decorativos

### Paleta de Colores:
- **Fondo**: Negro grafito (#111111)
- **Texto**: Blanco roto (#F5F0E8)
- **Acento dorado**: (#B8963E) — marcas de lápiz en papel amarillo
- **Verde construcción**: (#3D6B4F) — vegetación de Loreto
- **Superficie elevada**: (#1E1E1E)

### Tipografía:
- **Display**: Cormorant Garamond (serif clásico para títulos)
- **Body**: DM Sans (sans-serif humanista, muy legible)
- **Code/Labels**: JetBrains Mono (monoespaciado para datos técnicos)

### Animaciones:
- **Hero**: parallax sutil en imagen de fondo
- **Secciones**: slide-in desde izquierda al hacer scroll
- **Experiencia**: contadores numéricos animados
- **Proyectos**: reveal con clip-path de izquierda a derecha

---

## 🚀 Desarrollo Local

### Instalación
```bash
cd /Users/hugoqm/dev/projects/huquma-studio-website
pnpm install
pnpm dev
```
El sitio estará disponible en `http://localhost:3000`

### Comandos disponibles
| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo con hot reload |
| `pnpm build` | Genera build de producción en `dist/public/` |
| `pnpm preview` | Vista previa del build de producción |
| `pnpm check` | Verificación de tipos TypeScript |

---

## 📤 Despliegue

### Rama y flujos:
```
main branch    → Producción (huquma.studio)
develop branch → Staging/Activo (preview)
```

### Build de producción:
```bash
pnpm build
# Genera: dist/public/ → Subir por FTP a raíz del hosting
```

### Configuración de servidor:
- **Apache**: Crear `.htaccess` con RewriteRule hacia `index.html`
- **Nginx**: `try_files $uri $uri/ /index.html;`
- **GitHub Pages**: Usar GitHub Actions (ver README.md para template)

---

## 📝 Actualización de Contenido

### Agregar proyecto al portafolio
Editar `client/src/components/sections/PortfolioSection.tsx`:
```typescript
const projects: Project[] = [
  {
    id: "nombre-proyecto",
    name: "Nombre del Proyecto",
    location: "Loreto, BCS",
    type: "Residential",
    status: "current|past|planned",
    year: "2025",
    image: "URL_CDN",
    description: "...",
    tags: ["Tag1", "Tag2"],
  },
];
```

### Cambiar información de contacto
Editar `client/src/components/sections/ContactSection.tsx` → `contactItems` array

### Cambiar colores/tipografía
Editar `client/src/index.css` → sección `:root {}`

---

## 📸 Imágenes y Assets

- **Alojadas en CDN** (CloudFront) — mantener URLs externalizadas
- **NO** almacenar imágenes en el directorio del proyecto (aumenta tamaño del build)
- Agregar nuevas imágenes: subir a CDN del proyecto y usar URL directa en código

---

## 📞 Información de Contacto

- **WhatsApp**: +52 613 122 0058
- **Email**: hugo@huquma.studio
- **Facebook**: [HuQuMa Studio](https://web.facebook.com/profile.php?id=100083097284323)
- **YouTube**: [Canal HuQuMa](https://www.youtube.com/channel/UC9lKXLcmQcWI2kj7-JdQhog)
- **Loreto**: [loreto.com](https://loreto.com)

---

## 🔗 GitHub

**Repositorio**: https://github.com/HuQuMa-Studio/huquma-studio-website

---

## 📌 Notas para desarrollo

1. El sitio es **estático** — no requiere backend
2. Los datos de proyectos están en `PortfolioSection.tsx` (hardcoded)
3. Las animaciones se triggerean con `useScrollReveal` hook
4. El Navbar es sticky y tiene menú móvil responsivo
5. Usar Tailwind CSS 4 para todos los estilos (preferir clases a CSS custom)

---

**Última actualización**: 2026-05-21  
**Estado**: En producción desde 2025
