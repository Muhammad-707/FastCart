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

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/signUp" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const wrapSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <ProtectedRoute>{wrapSuspense(Home)}</ProtectedRoute> },
      { path: "contact", element: <ProtectedRoute>{wrapSuspense(Contact)}</ProtectedRoute> },
      { path: "about", element: <ProtectedRoute>{wrapSuspense(About)}</ProtectedRoute> },
      { path: "product", element: <ProtectedRoute>{wrapSuspense(Product)}</ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute>{wrapSuspense(Cart)}</ProtectedRoute> },
      { path: "detail/:id", element: <ProtectedRoute>{wrapSuspense(Detail)}</ProtectedRoute> },
      { path: "account", element: <ProtectedRoute>{wrapSuspense(Account)}</ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute>{wrapSuspense(Wishlist)}</ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute>{wrapSuspense(Checkout)}</ProtectedRoute> },
      
      { path: "signUp", element: <PublicRoute>{wrapSuspense(Signup)}</PublicRoute> },
      { path: "login", element: <PublicRoute>{wrapSuspense(Login)}</PublicRoute> },
      
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}