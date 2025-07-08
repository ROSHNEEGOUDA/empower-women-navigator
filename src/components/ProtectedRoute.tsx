// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("customJWT"); // adjust key name to match YOUR login logic!

  if (!token) {
    // 🔒 No token? Redirect to login
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
