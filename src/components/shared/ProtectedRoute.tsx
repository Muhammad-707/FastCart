import { Navigate } from "react-router-dom";
import React from "react";

interface RouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: RouteProps) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/signUp" replace />;
  }
  
  return <>{children}</>;
};

export const PublicRoute = ({ children }: RouteProps) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};