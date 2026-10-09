import NotFound from "@/pages/NotFound";
import GuidePage from "@/pages/GuidePage";
import GuidesIndex from "@/pages/GuidesIndex";
import ProjectDetail from "@/pages/ProjectDetail";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/portfolio/:slug"} component={ProjectDetail} />
      <Route path={"/guides"} component={GuidesIndex} />
      <Route path={"/guides/:slug"} component={GuidePage} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        {/* Toaster (sonner) y TooltipProvider de la plantilla de Manus se quitaron:
            el sitio no muestra toasts ni tooltips y sumaban ~180 KB de JS */}
        <Router />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
