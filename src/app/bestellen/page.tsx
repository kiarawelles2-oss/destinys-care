'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function BestellenPage() {
  const { items, total, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    houseNumber: '',
    phone: '',
    notes: '',
    paymentMethod: 'Contant bij levering',
    isParamaribo: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const deliveryFee = formData.isParamaribo ? 0 : 150;
  const totalWithDelivery = total() + deliveryFee;

  const handleSubmitOrder = async () => {
    if (!formData.name || !formData.street || !formData.houseNumber || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post('/api/orders', {
        customerName: formData.name,
        phone: formData.phone,
        address: `${formData.street} ${formData.houseNumber}`,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        deliveryFee,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
        totalAmount: totalWithDelivery,
      });

      const orderNumber = response.data.orderNumber;
      toast.success(`Order placed! Order #: ${orderNumber}`);

      // Open WhatsApp
      const message = `Hallo ${formData.name} 👋\n\nBedankt voor uw bestelling bij Destiny's Care.\n\nUw bestelling (#${orderNumber}) is goed ontvangen.\n\nWij nemen binnenkort contact met u op over de levering.\n\nMet vriendelijke groet,\nDestiny's Care`;
      const whatsappUrl = `https://wa.me/597${formData.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      clearCart();
      setStep(1);
      setFormData({
        name: '',
        street: '',
        houseNumber: '',
        phone: '',
        notes: '',
        paymentMethod: 'Contant bij levering',
        isParamaribo: true,
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error placing order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-light to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-main to-primary-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-white hover:text-accent-main transition">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-2">✨ Order - Destiny's Care</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Personal Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Volledige Naam *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Straatnaam *</label>
                      <input
                        type="text"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
                        placeholder="Straatnaam"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Huisnummer *</label>
                      <input
                        type="text"
                        value={formData.houseNumber}
                        onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Telefoonnummer *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
                      placeholder="+597 XXXXXXX"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="mt-6 w-full bg-primary-main text-white font-bold py-2 rounded-lg hover:bg-primary-dark transition"
                >
                  Next →
                </button>
              </div>
            )}

            {/* Step 2: Delivery & Payment */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">🚚 Delivery & Payment</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Location</label>
                    <select
                      value={formData.isParamaribo ? 'paramaribo' : 'outside'}
                      onChange={(e) => setFormData({ ...formData, isParamaribo: e.target.value === 'paramaribo' })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
                    >
                      <option value="paramaribo">Binnen Paramaribo (GRATIS)</option>
                      <option value="outside">Buiten Paramaribo (SRD 150)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
                    >
                      <option>Contant bij levering</option>
                      <option>Bankoverschrijving</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
                      placeholder="Any special instructions..."
                      rows={3}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-primary-main text-white font-bold py-2 rounded-lg hover:bg-primary-dark transition"
                  >
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">✅ Review Your Order</h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Customer Info</h3>
                    <p className="text-gray-600">Name: {formData.name}</p>
                    <p className="text-gray-600">Address: {formData.street} {formData.houseNumber}</p>
                    <p className="text-gray-600">Phone: {formData.phone}</p>
                  </div>
                  <div className="border-b pb-4">
                    <h3 className="font-semibold text-gray-800 mb-2">Delivery</h3>
                    <p className="text-gray-600">
                      {formData.isParamaribo ? 'Binnen Paramaribo (GRATIS)' : 'Buiten Paramaribo (SRD 150)'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Payment</h3>
                    <p className="text-gray-600">{formData.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-300 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={submitting}
                    className="flex-1 bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition disabled:bg-gray-300"
                  >
                    {submitting ? 'Processing...' : 'Place Order ✓'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">📦 Order Summary</h3>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {items.length === 0 ? (
                  <p className="text-gray-600 text-sm">No items in cart</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span className="font-semibold">SRD {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span>SRD {total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery:</span>
                  <span>SRD {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg text-primary-main border-t pt-2">
                  <span>Total:</span>
                  <span>SRD {totalWithDelivery.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/" className="block text-center mt-4 text-blue-600 hover:text-blue-800">
                ← Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
