'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function PinLoginPage() {
  const [pin, setPin] = useState('');
  const { login } = useAuthStore();
  const router = useRouter();

  const handleLogin = () => {
    if (pin.length !== 4) {
      toast.error('PIN must be 4 digits');
      return;
    }

    if (login(pin)) {
      toast.success('Login successful!');
      router.push('/admin/dashboard');
    } else {
      toast.error('Invalid PIN');
      setPin('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-accent-light">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-96">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-main mb-2">Lumea</h1>
          <p className="text-gray-600">Admin & Driver Portal</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Enter PIN
          </label>
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value.slice(0, 4))}
            onKeyPress={handleKeyPress}
            placeholder="••••"
            maxLength={4}
            className="w-full px-4 py-3 text-center text-2xl tracking-widest border-2 border-primary-light rounded-lg focus:outline-none focus:border-primary-main transition-colors"
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-primary-main to-primary-dark text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all duration-200 mb-4"
        >
          Login
        </button>

        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>Admin PIN: 8888</p>
          <p>Driver PIN: 2326</p>
        </div>
      </div>
    </div>
  );
}
