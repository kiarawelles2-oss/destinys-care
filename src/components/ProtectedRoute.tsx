import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function ProtectedRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'driver';
}) {
  const { isAuthenticated, userRole } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/pin-login');
      return;
    }

    if (requiredRole && userRole !== requiredRole) {
      router.push('/pin-login');
    }
  }, [isAuthenticated, userRole, requiredRole, router]);

  if (!isAuthenticated || (requiredRole && userRole !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
}
