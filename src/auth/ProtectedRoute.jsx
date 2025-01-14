import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    return <Navigate to="/Login" />;
  }

  if (!allowedRoles.includes(user)) {
    return <Navigate to="/AdminPanel" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;