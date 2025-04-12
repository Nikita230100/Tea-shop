import { Navigate } from "react-router";
import React from 'react';
import BasicExample from './Spinner';

export default function AuthRoute({children, user, redirectTo}) {
    if (user.status === 'logging') {  
        return <BasicExample/ >
    }
    if (user.status === 'logged') { 
      return <Navigate to={redirectTo} replace />;
    }
    return children;
  }