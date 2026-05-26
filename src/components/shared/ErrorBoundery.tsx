import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full px-4 text-center bg-white dark:bg-[#121212]">
          <h2 className="text-3xl font-bold text-[#DB4444] mb-4">
            Oops! Something went wrong.
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md">
            We're sorry, but an unexpected error occurred. Please try refreshing the page or go back to the home page.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-[#DB4444] text-white px-8 py-3 rounded-sm font-medium hover:bg-red-600 transition-colors"
            >
              Refresh Page
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="bg-transparent border border-zinc-300 dark:border-zinc-700 text-black dark:text-white px-8 py-3 rounded-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}