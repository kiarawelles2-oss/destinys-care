'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

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

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await axios.get('/api/driver/deliveries');
      setDeliveries(response.data);
    } catch (error) {
      toast.error('Error fetching deliveries');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (deliveryId: string, newStatus: string) => {
    try {
      await axios.put(`/api/driver/deliveries/${deliveryId}`, { status: newStatus });
      toast.success('Status updated');
      fetchDeliveries();
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  const sendWhatsApp = (phone: string, name: string) => {
    const message = `Hallo ${name}, ik ben onderweg met uw bestelling!`;
    const whatsappUrl = `https://wa.me/597${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  const pendingDeliveries = deliveries.filter((d) => d.status === 'Pending');
  const inTransitDeliveries = deliveries.filter((d) => d.status === 'In Transit');
  const completedDeliveries = deliveries.filter((d) => d.status === 'Delivered');

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">My Deliveries</h1>

      {/* Pending Deliveries */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📦 Pending ({pendingDeliveries.length})</h2>
        <div className="grid gap-4">
          {pendingDeliveries.length === 0 ? (
            <p className="text-gray-600">No pending deliveries</p>
          ) : (
            pendingDeliveries.map((delivery) => (
              <div key={delivery.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{delivery.order.orderNumber}</h3>
                    <p className="text-gray-600">{delivery.order.customer.name}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {delivery.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">📍 {delivery.order.customer.address}</p>
                <p className="text-gray-600 mb-4">📞 {delivery.order.customer.phone}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus(delivery.id, 'In Transit')}
                    className="flex-1 bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition"
                  >
                    Start Delivery
                  </button>
                  <button
                    onClick={() => sendWhatsApp(delivery.order.customer.phone, delivery.order.customer.name)}
                    className="flex-1 bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* In Transit */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🚚 In Transit ({inTransitDeliveries.length})</h2>
        <div className="grid gap-4">
          {inTransitDeliveries.length === 0 ? (
            <p className="text-gray-600">No deliveries in transit</p>
          ) : (
            inTransitDeliveries.map((delivery) => (
              <div key={delivery.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-orange-500">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{delivery.order.orderNumber}</h3>
                    <p className="text-gray-600">{delivery.order.customer.name}</p>
                  </div>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {delivery.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">📍 {delivery.order.customer.address}</p>
                <p className="text-gray-600 mb-4">📞 {delivery.order.customer.phone}</p>
                <button
                  onClick={() => updateStatus(delivery.id, 'Delivered')}
                  className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
                >
                  Mark as Delivered ✓
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Completed */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">✅ Delivered ({completedDeliveries.length})</h2>
        <div className="grid gap-4">
          {completedDeliveries.length === 0 ? (
            <p className="text-gray-600">No completed deliveries</p>
          ) : (
            completedDeliveries.map((delivery) => (
              <div key={delivery.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500 opacity-75">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{delivery.order.orderNumber}</h3>
                    <p className="text-gray-600">{delivery.order.customer.name}</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    {delivery.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
