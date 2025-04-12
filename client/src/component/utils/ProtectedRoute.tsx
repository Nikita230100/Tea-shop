import React from 'react';
import { Navigate } from 'react-router';
import BasicExample from './Spinner';

export default function ProtectedRoute({children, user, redirectTo}) {
  if (user.status === 'logging') {
    return <BasicExample/ >
  } 
  if ( user.status !== 'logged') {
    return <Navigate to={redirectTo} replace />;
  }
    return children
  
}