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
}

export const statusColors: Record<ProjectStatus, string> = {
  current: "#4CAF50",
  past: "#B8963E",
  planned: "#5B9BD5",
};

export const statusLabels: Record<ProjectStatus, string> = {
  current: "In Progress",
  past: "Completed",
  planned: "Upcoming",
};
