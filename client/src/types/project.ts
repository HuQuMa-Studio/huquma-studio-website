/* =============================================================
   Project types — compartidos entre PortfolioSection y ProjectDetail.
   La API (/api/projects) devuelve datos en este formato.
   ============================================================= */

export type ProjectStatus = "current" | "past" | "planned";

export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  type: string;
  status: ProjectStatus;
  year: string;
  image: string;
  description: string; // Descripción Corta — se muestra en la card del portafolio
  descriptionFull: string; // Descripción Completa — versión larga para la sub-página
  bedrooms: number | null;
  bathrooms: number | null;
  squareFeet: number | null;
  gallery: string[]; // URLs de fotos adicionales (cada línea de "Galería URLs" en Notion)
  tags: string[];
  planImage: string; // Foto Plano URL — lámina 01 de la portada (opcional)
  buildImage: string; // Foto Obra URL — lámina 02 de la portada
  featured: boolean; // Mostrar en Portada
}

// Categorías de "Tipo" en Notion, en el orden de las pestañas del portafolio.
// Solo se muestran las que tienen al menos un proyecto.
export const projectTypes = [
  "Residential",
  "Commercial",
  "Remodel & Additions",
  "Development",
] as const;

// "Residential · 2007" — omite el separador si falta alguno de los dos.
export function projectMeta(project: Pick<Project, "type" | "year">): string {
  return [project.type, project.year].filter(Boolean).join(" · ");
}

export const statusLabels: Record<ProjectStatus, string> = {
  current: "In Progress",
  past: "Completed",
  planned: "Upcoming",
};
