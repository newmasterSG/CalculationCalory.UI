import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from "../../hooks/reduxHooks";


interface AuthGuardProps {
    element: React.ReactElement;
  }
  
  const AuthGuard: React.FC<AuthGuardProps> = ({ element }) => {
    const { accessToken, refreshToken } = useAppSelector(slicer => slicer.auth);
    const location = useLocation(); 
  
    if (!accessToken || !refreshToken) {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return element;
  };
  
  export default AuthGuard;