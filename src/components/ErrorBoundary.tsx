import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Er is iets misgegaan</h1>
          <p style={{ color: "#666", marginBottom: "1.5rem" }}>De pagina kon niet geladen worden. Probeer het opnieuw.</p>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: "0.75rem 1.5rem", background: "#0ea5e9", color: "#fff", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "1rem" }}
          >
            Pagina herladen
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
