import React, { Suspense } from "react"; // <-- Добавили Suspense
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; 
import { ThemeProvider } from "./components/shared/ThemeProvider"; 
import { Provider } from 'react-redux';
import { store } from './store/store'; 
import "./library/i18n"; // <-- Достаточно просто импортировать файл

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        {/* Добавляем Suspense с экраном загрузки */}
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Загрузка...</div>}>
          <App />
        </Suspense>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);