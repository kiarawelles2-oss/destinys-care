'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Delivery {
  id: string;
  order: {
    orderNumber: string;
    customer: { name: string; phone: string; address: string };
    deliveryFee: number;
    totalAmount: number;
  };
  status: string;
}

export default function DriverPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, userRole, logout } = useAuthStore();
  const router = useRouter();
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [stats, setStats] = useState({ pending: 0, completed: 0, earnings: 0 });

  useEffect(() => {
    if (!isAuthenticated || userRole !== 'driver') {
      router.push('/pin-login');
    } else {
      fetchDeliveries();
    }
  }, [isAuthenticated, userRole, router]);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('/api/driver/deliveries');
      setDeliveries(response.data);
      
      const pending = response.data.filter((d: Delivery) => d.status === 'Pending').length;
      const completed = response.data.filter((d: Delivery) => d.status === 'Delivered').length;
      const earnings = response.data.reduce((sum: number, d: Delivery) => sum + d.order.deliveryFee, 0);
      
      setStats({ pending, completed, earnings });
    } catch (error) {
      console.error('Error fetching deliveries:', error);
    }
  };

  if (!isAuthenticated || userRole !== 'driver') {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-primary-main to-primary-dark text-white shadow-lg">
        <div className="p-6 border-b border-primary-dark">
          <h1 className="text-2xl font-bold">🚚 Driver Portal</h1>
          <p className="text-primary-light text-sm">Delivery Management</p>
        </div>

        <nav className="mt-6 space-y-2 px-4">
          <a href="/driver-portal/dashboard" className="block px-4 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200">
            🏠 Dashboard
          </a>
          <a href="/driver-portal/deliveries" className="block px-4 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200">
            📦 Deliveries
          </a>
          <a href="/driver-portal/earnings" className="block px-4 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200">
            💰 Earnings
          </a>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={() => {
              logout();
              router.push('/pin-login');
            }}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors"
          >
            🔒 Logout
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
