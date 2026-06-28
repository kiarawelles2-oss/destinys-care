'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EarningsPage() {
  const [earnings, setEarnings] = useState({ total: 0, monthly: 0, deliveries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEarnings();
  }, []);

  const fetchEarnings = async () => {
    try {
      const response = await axios.get('/api/driver/earnings');
      setEarnings(response.data);
    } catch (error) {
      console.error('Error fetching earnings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">💰 Earnings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">Total Earnings</p>
          <p className="text-4xl font-bold text-green-600 mt-2">SRD {earnings.total.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">This Month</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">SRD {earnings.monthly.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm">Total Deliveries</p>
          <p className="text-4xl font-bold text-purple-600 mt-2">{earnings.deliveries}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Information</h2>
        <p className="text-gray-600 mb-4">Earnings are calculated based on delivery fees completed. Payments are processed monthly.</p>
        <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
