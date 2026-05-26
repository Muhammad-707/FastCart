import React, { Suspense } from "react"; 
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; 
import { ThemeProvider } from "./components/shared/ThemeProvider"; 
import { Provider } from 'react-redux';
import { store } from './store/store'; 
import "./library/i18n"; 
import Loading from "./components/shared/Loading";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><Loading/></div>}>
          <App />
        </Suspense>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);