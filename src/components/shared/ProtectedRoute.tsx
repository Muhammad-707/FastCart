import { Navigate } from "react-router-dom";
import React from "react";

// Используем React.ReactNode, это самый правильный тип для детей в React
interface RouteProps {
  children: React.ReactNode;
}

// Для защищенных страниц (Home, Account и т.д.)
export const ProtectedRoute = ({ children }: RouteProps) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/signUp" replace />;
  }
  
  return <>{children}</>;
};

// Для страниц Login/Signup, чтобы залогиненный юзер не мог туда зайти
export const PublicRoute = ({ children }: RouteProps) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};