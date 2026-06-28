'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, userRole, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'admin') {
      router.push('/pin-login');
    }
  }, [isAuthenticated, userRole, router]);

  if (!isAuthenticated || userRole !== 'admin') {
    return null;
  }

  const menuItems = [
    { label: '🏠 Dashboard', href: '/admin/dashboard' },
    { label: '🛒 Orders', href: '/admin/orders' },
    { label: '📦 Products', href: '/admin/products' },
    { label: '👥 Customers', href: '/admin/customers' },
    { label: '🚚 Drivers', href: '/admin/drivers' },
    { label: '💵 Expenses', href: '/admin/expenses' },
    { label: '📈 Reports', href: '/admin/reports' },
    { label: '⚙️ Settings', href: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-primary-main to-primary-dark text-white shadow-lg">
        <div className="p-6 border-b border-primary-dark">
          <h1 className="text-2xl font-bold">Lumea Admin</h1>
          <p className="text-primary-light text-sm">Management System</p>
        </div>

        <nav className="mt-6 space-y-2 px-4">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-4 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => {
              logout();
              router.push('/pin-login');
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors"
          >
            🔒 Lock
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
