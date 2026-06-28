'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface DashboardStats {
  totalOrders: number;
  revenue: number;
  paidVsUnpaid: { paid: number; unpaid: number };
  ordersToday: number;
  pendingDeliveries: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    revenue: 0,
    paidVsUnpaid: { paid: 0, unpaid: 0 },
    ordersToday: 0,
    pendingDeliveries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({
    title,
    value,
    icon,
    color,
  }: {
    title: string;
    value: string | number;
    icon: string;
    color: string;
  }) => (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          icon="🛒"
          color="border-blue-500"
        />
        <StatCard
          title="Revenue"
          value={`SRD ${stats.revenue.toFixed(2)}`}
          icon="💰"
          color="border-green-500"
        />
        <StatCard
          title="Orders Today"
          value={stats.ordersToday}
          icon="📅"
          color="border-purple-500"
        />
        <StatCard
          title="Pending Deliveries"
          value={stats.pendingDeliveries}
          icon="🚚"
          color="border-orange-500"
        />
      </div>

      {/* Paid vs Unpaid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Paid</span>
              <span className="text-2xl font-bold text-green-600">
                {stats.paidVsUnpaid.paid}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Unpaid</span>
              <span className="text-2xl font-bold text-red-600">
                {stats.paidVsUnpaid.unpaid}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
