import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black p-6 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Что-то пошло не так</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8">Мы работаем над исправлением ошибки.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-8 py-3 bg-[#DB4444] text-white rounded-sm hover:bg-[#b93a3a] transition-all"
          >
            Обновить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}