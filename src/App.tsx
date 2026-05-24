import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Layout from "@/layout/layout";
import Loading from "@/components/shared/Loading"; 
import { WishlistProvider } from "@/pages/Wishlist/WishlistContext";
import { AuthProvider } from "@/components/shared/AuthContext";
import { ErrorBoundary } from "@/components/shared/ErrorBoundery";
import { NotFound } from "@/components/shared/NotFound"; 
import { 
  Home, Contact, About, Signup, Login, 
  Account, Product, Cart, Wishlist, Detail, Checkout 
} from "./router/router";

// --- Компоненты защиты (без JSX) ---
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated 
    ? children 
    : React.createElement(Navigate, { to: "/signUp", replace: true });
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return !isAuthenticated 
    ? children 
    : React.createElement(Navigate, { to: "/", replace: true });
};

// Функция-помощник для обертки в Suspense без JSX
const wrapSuspense = (Component: React.ComponentType) => 
  React.createElement(Suspense, { fallback: React.createElement(Loading) }, 
    React.createElement(Component)
  );

// --- Конфигурация роутера (без JSX) ---
const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(Layout),
    children: [
      { path: "/", element: React.createElement(ProtectedRoute, null, wrapSuspense(Home)) },
      { path: "contact", element: React.createElement(ProtectedRoute, null, wrapSuspense(Contact)) },
      { path: "about", element: React.createElement(ProtectedRoute, null, wrapSuspense(About)) },
      { path: "product", element: React.createElement(ProtectedRoute, null, wrapSuspense(Product)) },
      { path: "cart", element: React.createElement(ProtectedRoute, null, wrapSuspense(Cart)) },
      { path: "detail/:id", element: React.createElement(ProtectedRoute, null, wrapSuspense(Detail)) },
      { path: "account", element: React.createElement(ProtectedRoute, null, wrapSuspense(Account)) },
      { path: "wishlist", element: React.createElement(ProtectedRoute, null, wrapSuspense(Wishlist)) },
      { path: "checkout", element: React.createElement(ProtectedRoute, null, wrapSuspense(Checkout)) },
      
      { path: "signUp", element: React.createElement(PublicRoute, null, wrapSuspense(Signup)) },
      { path: "login", element: React.createElement(PublicRoute, null, wrapSuspense(Login)) },
      
      { path: "*", element: React.createElement(NotFound) },
    ],
  },
]);

// --- Корневой компонент (без JSX) ---
export default function App() {
  return React.createElement(ErrorBoundary, null,
    React.createElement(AuthProvider, null,
      React.createElement(WishlistProvider, null,
        React.createElement(RouterProvider, { router: router })
      )
    )
  );
}