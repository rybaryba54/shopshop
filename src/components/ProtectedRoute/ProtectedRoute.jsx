import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const ProtectedRoute = () => {
  const [user, loading, error] = useAuthState(auth);

  return <>{loading ? <div>loading...</div> : !user ? <Navigate to="/" replace /> : <Outlet />}</>;
};
