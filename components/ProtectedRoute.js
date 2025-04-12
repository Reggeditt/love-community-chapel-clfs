'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from '@/hooks/contexts/storeContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const {currentUser} = useStore();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser || !allowedRoles.includes(currentUser?.role)) {
      router.push('/login');
    }
  }, [currentUser, allowedRoles, router]);

  if (!currentUser || !allowedRoles.includes(currentUser?.role)) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
