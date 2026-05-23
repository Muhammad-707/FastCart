import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Убрали .tsx, это стандарт
import "./index.css"; 
import { ThemeProvider } from "./components/shared/ThemeProvider"; 
import { Provider } from 'react-redux';
import { store } from './store/store'; 

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);