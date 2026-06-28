import { create } from 'zustand';

interface AuthStore {
  isAuthenticated: boolean;
  userRole: 'admin' | 'driver' | null;
  login: (pin: string) => boolean;
  logout: () => void;
}

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || '8888';
const DRIVER_PIN = process.env.NEXT_PUBLIC_DRIVER_PIN || '2326';

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  userRole: null,
  login: (pin: string) => {
    if (pin === ADMIN_PIN) {
      set({ isAuthenticated: true, userRole: 'admin' });
      localStorage.setItem('auth', JSON.stringify({ role: 'admin', pin }));
      return true;
    }
    if (pin === DRIVER_PIN) {
      set({ isAuthenticated: true, userRole: 'driver' });
      localStorage.setItem('auth', JSON.stringify({ role: 'driver', pin }));
      return true;
    }
    return false;
  },
  logout: () => {
    set({ isAuthenticated: false, userRole: null });
    localStorage.removeItem('auth');
  },
}));
