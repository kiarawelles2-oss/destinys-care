'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DriverDashboardPage() {
  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
    earnings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/driver/deliveries');
      const deliveries = response.data;
      
      const pending = deliveries.filter((d: any) => d.status === 'Pending').length;
      const completed = deliveries.filter((d: any) => d.status === 'Delivered').length;
      const earnings = deliveries.reduce((sum: number, d: any) => sum + d.order.deliveryFee, 0);
      
      setStats({ pending, completed, earnings });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

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
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Driver Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Pending Deliveries"
          value={stats.pending}
          icon="📦"
          color="border-blue-500"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon="✅"
          color="border-green-500"
        />
        <StatCard
          title="Total Earnings"
          value={`SRD ${stats.earnings.toFixed(2)}`}
          icon="💰"
          color="border-yellow-500"
        />
      </div>
    </div>
  );
}
