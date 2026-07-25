import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no JWT token is stored, redirect to the login interface
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
