/* =============================================================
   StatusBadge — estatus del proyecto con la regla Grafito & Dorado
   (DESIGN.md): se distingue por relleno vs. contorno, no por color.
   - In Progress: relleno dorado, texto grafito
   - Completed:   contorno dorado, texto dorado claro
   - Upcoming:    contorno neutro, texto gris claro
   ============================================================= */

import type { ProjectStatus } from "@/types/project";
import { statusLabels } from "@/types/project";

const variants: Record<ProjectStatus, string> = {
  current: "bg-[#B8963E] border-[#B8963E] text-[#111111]",
  past: "bg-[#111111]/85 border-[#B8963E] text-[#D4AF5A]",
  planned: "bg-[#111111]/85 border-white/30 text-[#C8C8C8]",
};

export default function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 border text-[10px] tracking-widest uppercase font-mono-custom ${variants[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
