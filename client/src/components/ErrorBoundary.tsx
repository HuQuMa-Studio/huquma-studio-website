import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, ReactNode } from "react";
import { EMAIL } from "@/lib/contact";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen px-6 py-16 bg-[#111111]">
          <div className="flex flex-col items-center w-full max-w-md text-center">
            <AlertTriangle size={40} className="text-[#B8963E] mb-6 flex-shrink-0" />

            <h2 className="font-display text-3xl text-[#F5F0E8] mb-3">
              This page didn't load
            </h2>
            <p className="text-[#C8C8C8] text-base leading-relaxed mb-8">
              Something went wrong on my end. Reloading usually fixes it. If it
              doesn't, email me at{" "}
              <a href={`mailto:${EMAIL}`} className="text-[#D4AF5A] underline underline-offset-4">
                {EMAIL}
              </a>{" "}
              and I'll help.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="btn-gold inline-flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reload the page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
