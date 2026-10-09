import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// El pre-render del build marca el contenedor con su ruta (data-ssr). Si es la
// URL actual, React hidrata ese HTML; si no (dev, 404.html, o un proyecto nuevo
// en Notion que aún no tiene pre-render), renderiza desde cero.
const container = document.getElementById("root")!;
if (container.dataset.ssr === window.location.pathname) {
  hydrateRoot(container, <App />);
} else {
  container.textContent = "";
  createRoot(container).render(<App />);
}
