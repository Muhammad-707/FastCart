import { Navigate } from "react-router-dom";
import React from "react";

interface RouteProps {
  children: React.ReactNode;
}

// Защищает маршрут: только для авторизованных
export const ProtectedRoute = ({ children }: RouteProps) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/signUp" replace />;
};

// Защищает маршрут: только для НЕавторизованных (чтобы не зайти на Login/SignUp)
export const PublicRoute = ({ children }: RouteProps) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};