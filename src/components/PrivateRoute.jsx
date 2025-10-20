import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRoute({ isLoggedIn, children }) {
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect ke halaman login dengan state untuk mengingat halaman sebelumnya
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}