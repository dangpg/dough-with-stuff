import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
