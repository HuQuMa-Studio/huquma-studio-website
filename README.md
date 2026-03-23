# HuQuMa Studio [Design+Build]

**Sitio web oficial de Hugo Quintero Maldonado — Design + Build + Manage**  
Loreto, Baja California Sur, México

---

## Descripción

Sitio web estático profesional construido con React 19 + Vite + Tailwind CSS 4. Presenta los servicios, experiencia de 30+ años y portafolio de proyectos de HuQuMa Studio.

### Secciones del sitio

| Sección | Descripción |
|---|---|
| **Hero** | Imagen de portada con planos arquitectónicos, logo y CTAs de contacto |
| **About** | Presentación de Hugo Quintero Maldonado con retrato y credenciales |
| **Services** | Grid de 9 servicios: construcción, diseño, remodelación, DRO, etc. |
| **Experience** | Estadísticas animadas y timeline de trayectoria profesional (1993–presente) |
| **Portfolio** | Proyectos con filtros: Current / Past / Planned |
| **Contact** | Información de contacto, dirección y redes sociales |

---

## Stack Tecnológico

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: Wouter
- **Fonts**: Cormorant Garamond + DM Sans + JetBrains Mono (Google Fonts)
- **Icons**: Lucide React + SVG inline

---

## Estructura del Proyecto

```
huquma-studio/
├── client/
│   ├── index.html              # HTML principal con metadatos y fuentes
│   ├── public/                 # Archivos estáticos (favicon, robots.txt)
│   └── src/
│       ├── App.tsx             # Router y ThemeProvider
│       ├── index.css           # Tokens de diseño y estilos globales
│       ├── main.tsx            # Punto de entrada React
│       ├── components/
│       │   ├── Navbar.tsx      # Navegación sticky con menú móvil
│       │   ├── Footer.tsx      # Footer con logo y redes sociales
│       │   └── sections/
│       │       ├── HeroSection.tsx       # Sección hero
│       │       ├── AboutSection.tsx      # Sección about
│       │       ├── ServicesSection.tsx   # Sección servicios
│       │       ├── ExperienceSection.tsx # Sección experiencia
│       │       ├── PortfolioSection.tsx  # Sección portafolio
│       │       └── ContactSection.tsx    # Sección contacto
│       ├── hooks/
│       │   └── useScrollReveal.ts  # Hook de animaciones scroll
│       └── pages/
│           └── Home.tsx        # Página principal
├── dist/                       # Build de producción (generado)
│   └── public/                 # Archivos para subir por FTP
├── package.json
├── vite.config.ts
└── README.md
```

---

## Desarrollo Local

### Requisitos previos

- Node.js 18+ 
- pnpm (recomendado) o npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/huquma-studio.git
cd huquma-studio

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

El sitio estará disponible en `http://localhost:3000`

### Comandos disponibles

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo con hot reload |
| `pnpm build` | Genera el build de producción en `dist/public/` |
| `pnpm preview` | Vista previa del build de producción |
| `pnpm check` | Verificación de tipos TypeScript |

---

## Despliegue

### Opción 1: Subir por FTP

1. Ejecutar el build de producción:
   ```bash
   pnpm build
   ```

2. El directorio `dist/public/` contiene todos los archivos listos para subir:
   - `index.html` — Página principal
   - `assets/` — CSS y JavaScript minificados

3. Subir el **contenido** de `dist/public/` a la raíz de tu hosting (generalmente `public_html/` o `www/`).

4. **Importante**: Si tu hosting usa Apache, crear un archivo `.htaccess` en la raíz:
   ```apache
   Options -MultiViews
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^ index.html [QSA,L]
   ```

5. Si usa Nginx, agregar en la configuración del servidor:
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

### Opción 2: GitHub Pages

1. Crear repositorio en GitHub
2. Configurar GitHub Actions para build automático:

   Crear `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: pnpm/action-setup@v3
           with:
             version: 10
         - uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: 'pnpm'
         - run: pnpm install
         - run: pnpm build
         - uses: peaceiris/actions-gh-pages@v4
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist/public
   ```

3. En GitHub → Settings → Pages → Source: `gh-pages` branch

### Opción 3: Netlify / Vercel

- **Build command**: `pnpm build`
- **Publish directory**: `dist/public`
- **Node version**: 20

---

## Flujo de Trabajo con GitHub (Sitio de Producción + Staging)

Para mantener dos entornos (producción y staging/activo):

```
main branch    → Producción (huquma.studio)
develop branch → Staging (staging.huquma.studio o preview)
```

### Proceso de actualización

```bash
# 1. Trabajar en la rama develop
git checkout develop

# 2. Hacer cambios (editar proyectos, agregar fotos, etc.)
# Editar archivos en client/src/components/sections/

# 3. Probar localmente
pnpm dev

# 4. Commit y push a develop (actualiza staging)
git add .
git commit -m "feat: agregar nuevo proyecto al portafolio"
git push origin develop

# 5. Cuando esté listo para producción, merge a main
git checkout main
git merge develop
git push origin main
# → GitHub Actions despliega automáticamente a producción
```

---

## Actualización de Contenido

### Agregar un nuevo proyecto al portafolio

Editar `client/src/components/sections/PortfolioSection.tsx`:

```typescript
const projects: Project[] = [
  // Agregar nuevo proyecto:
  {
    id: "nombre-proyecto",
    name: "Nombre del Proyecto",
    location: "Loreto, BCS",
    type: "Residential",
    status: "current", // "current" | "past" | "planned"
    year: "2025",
    image: "URL_DE_LA_IMAGEN",
    description: "Descripción del proyecto...",
    tags: ["Tag1", "Tag2"],
  },
  // ... proyectos existentes
];
```

### Cambiar información de contacto

Editar `client/src/components/sections/ContactSection.tsx` — array `contactItems`.

### Cambiar colores o tipografía

Editar `client/src/index.css` — sección `:root {}` con los tokens de diseño.

---

## Imágenes y Assets

Las imágenes están alojadas en CDN (CloudFront). Para agregar nuevas imágenes:

1. Subir la imagen al CDN del proyecto usando la herramienta de Manus
2. Usar la URL del CDN directamente en el código
3. **No** almacenar imágenes en el directorio del proyecto (aumenta el tamaño del build)

---

## Información de Contacto

- **WhatsApp**: +52 613 122 0058
- **Email**: hugo@huquma.studio
- **Facebook**: [HuQuMa Studio](https://web.facebook.com/profile.php?id=100083097284323)
- **YouTube**: [Canal HuQuMa](https://www.youtube.com/channel/UC9lKXLcmQcWI2kj7-JdQhog)
- **Loreto**: [loreto.com](https://loreto.com)

---

© 2025 HuQuMa Studio [Design+Build]. Loreto, Baja California Sur, México.
