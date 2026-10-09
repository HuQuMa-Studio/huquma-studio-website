/* =============================================================
   useProjects — lista de proyectos de /api/projects compartida por
   Hero, Portfolio y ProjectDetail: una sola petición por visita
   (index.html la precarga). Sin API (dev local) o si falla, usa los
   proyectos de respaldo.
   ============================================================= */

import { useEffect, useState } from "react";
import { FALLBACK_PROJECTS } from "@/data/fallbackProjects";
import type { Project } from "@/types/project";

let request: Promise<Project[]> | null = null;
let cached: Project[] | null = null;

function loadProjects(): Promise<Project[]> {
  request ??= fetch("/api/projects")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<Project[]>;
    })
    .then((data) => (Array.isArray(data) && data.length > 0 ? data : FALLBACK_PROJECTS))
    .catch(() => FALLBACK_PROJECTS)
    .then((data) => (cached = data));
  return request;
}

export function useProjects(): { projects: Project[]; loading: boolean } {
  const [projects, setProjects] = useState<Project[] | null>(cached);

  useEffect(() => {
    if (cached) return;
    let alive = true;
    loadProjects().then((data) => alive && setProjects(data));
    return () => {
      alive = false;
    };
  }, []);

  return { projects: projects ?? [], loading: projects === null };
}
