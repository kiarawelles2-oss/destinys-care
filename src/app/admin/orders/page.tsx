'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Order {
  id: string;
  orderNumber: string;
  customer: { name: string; phone: string };
  totalAmount: number;
  status: string;
  paymentMethod: string;
  paid: boolean;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Nieuw':
        return 'bg-blue-100 text-blue-800';
      case 'Bevestigd':
        return 'bg-purple-100 text-purple-800';
      case 'Onderweg':
        return 'bg-orange-100 text-orange-800';
      case 'Afgeleverd':
        return 'bg-green-100 text-green-800';
      case 'Geannuleerd':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Orders</h1>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
        >
          <option value="all">All Orders</option>
          <option value="Nieuw">New</option>
          <option value="Bevestigd">Confirmed</option>
          <option value="Onderweg">In Transit</option>
          <option value="Afgeleverd">Delivered</option>
          <option value="Geannuleerd">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-primary-light">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Order #</th>
              <th className="px-6 py-3 text-left font-semibold">Customer</th>
              <th className="px-6 py-3 text-left font-semibold">Phone</th>
              <th className="px-6 py-3 text-left font-semibold">Total</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Payment</th>
              <th className="px-6 py-3 text-left font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 font-bold text-primary-main">{order.orderNumber}</td>
                <td className="px-6 py-3">{order.customer.name}</td>
                <td className="px-6 py-3">{order.customer.phone}</td>
                <td className="px-6 py-3 font-semibold">SRD {order.totalAmount.toFixed(2)}</td>
                <td className="px-6 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <span className={order.paid ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                    {order.paid ? '✓ Paid' : '✗ Unpaid'}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
