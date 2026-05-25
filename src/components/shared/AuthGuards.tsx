import { Navigate } from "react-router-dom";
import React from "react";

interface RouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: RouteProps) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <>{children}</> : <Navigate to="/signUp" replace />;
};

export const PublicRoute = ({ children }: RouteProps) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};