/* =============================================================
   useProjects — lista de proyectos de /api/projects compartida por
   Hero, Portfolio y ProjectDetail: una sola petición por visita
   (index.html la precarga). Sin API (dev local) o si falla, usa los
   proyectos de respaldo.

   Pre-render: el build incrusta en el HTML los proyectos con los que
   se generó (window.__PROJECTS__). El primer render usa esa foto fija,
   igual a la del servidor, y la petición a Notion la actualiza después:
   lo que Hugo cambia en Notion sigue apareciendo sin redeploy.
   ============================================================= */

import { useEffect, useState } from "react";
import { FALLBACK_PROJECTS } from "@/data/fallbackProjects";
import type { Project } from "@/types/project";

declare global {
  interface Window {
    __PROJECTS__?: Project[];
  }
}

let request: Promise<Project[]> | null = null;
let cached: Project[] | null = null;
let snapshot: Project[] | null =
  typeof window !== "undefined" && Array.isArray(window.__PROJECTS__) ? window.__PROJECTS__ : null;

// Pre-render (servidor): fija los proyectos con los que se genera el HTML
export function primeProjects(data: Project[]): void {
  snapshot = data;
}

function loadProjects(): Promise<Project[]> {
  request ??= fetch("/api/projects")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<Project[]>;
    })
    .then((data) => (Array.isArray(data) && data.length > 0 ? data : (snapshot ?? FALLBACK_PROJECTS)))
    .catch(() => snapshot ?? FALLBACK_PROJECTS)
    .then((data) => (cached = data));
  return request;
}

export function useProjects(): { projects: Project[]; loading: boolean } {
  const [projects, setProjects] = useState<Project[] | null>(cached ?? snapshot);

  useEffect(() => {
    if (cached) {
      setProjects(cached);
      return;
    }
    let alive = true;
    loadProjects().then((data) => alive && setProjects(data));
    return () => {
      alive = false;
    };
  }, []);

  return { projects: projects ?? [], loading: projects === null };
}
