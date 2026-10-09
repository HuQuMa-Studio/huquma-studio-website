/* =============================================================
   Entrada de servidor para el pre-render del build
   (scripts/prerender.ts). Renderiza una ruta a HTML con los proyectos
   dados, y re-exporta lo que el script necesita del código del cliente.
   ============================================================= */

import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";
import { primeProjects } from "@/hooks/useProjects";
import type { Project } from "@/types/project";

export { FALLBACK_PROJECTS } from "@/data/fallbackProjects";
export {
  HOME_DESCRIPTION,
  HOME_TITLE,
  homeJsonLd,
  projectDescription,
  projectJsonLd,
  projectTitle,
} from "@/lib/seo";

export function render(url: string, projects: Project[]): string {
  primeProjects(projects);
  return renderToString(
    <Router ssrPath={url}>
      <App />
    </Router>,
  );
}
