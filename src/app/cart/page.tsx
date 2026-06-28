'use client';

import { useCartStore } from '@/store/cartStore';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCartStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary-light to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-main to-primary-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-white hover:text-accent-main transition">
            ← Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-2">✨ Shopping Cart</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <p className="text-2xl text-gray-600 mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block bg-primary-main text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-dark transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-primary-light">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold">Product</th>
                      <th className="px-6 py-3 text-left font-semibold">Price</th>
                      <th className="px-6 py-3 text-left font-semibold">Quantity</th>
                      <th className="px-6 py-3 text-left font-semibold">Total</th>
                      <th className="px-6 py-3 text-left font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <span className="font-medium text-gray-800">{item.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">SRD {item.price.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, Math.max(1, item.quantity - 1))
                              }
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              −
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-bold text-primary-main">
                          SRD {(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800 font-semibold"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-20">
                <h3 className="text-xl font-bold text-gray-800 mb-6">📦 Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>SRD {total().toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg text-primary-main">
                      <span>Total</span>
                      <span>SRD {total().toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href="/bestellen"
                  className="w-full block text-center bg-gradient-to-r from-primary-main to-primary-dark text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all mb-4"
                >
                  Proceed to Checkout →
                </Link>

                <button
                  onClick={clearCart}
                  className="w-full bg-red-100 text-red-600 font-semibold py-2 rounded-lg hover:bg-red-200 transition"
                >
                  Clear Cart
                </button>

                <Link
                  href="/"
                  className="block text-center mt-4 text-blue-600 hover:text-blue-800"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
