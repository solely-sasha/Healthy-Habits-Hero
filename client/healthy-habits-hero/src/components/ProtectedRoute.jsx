
import React from "react";
import { Route, Navigate } from "react-router-dom";

function ProtectedRoute({ element: Element, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/signin" />}
    />
  );
}

export default ProtectedRoute;
