'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface DeliverySettings {
  paraMariboFee: number;
  outsideParaMariboFee: number;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<DeliverySettings>({
    paraMariboFee: 0,
    outsideParaMariboFee: 150,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get('/api/settings');
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put('/api/settings', settings);
      toast.success('Settings saved!');
    } catch (error) {
      toast.error('Error saving settings');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Delivery Settings</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Delivery Fee - Paramaribo (SRD)
            </label>
            <input
              type="number"
              value={settings.paraMariboFee}
              onChange={(e) =>
                setSettings({ ...settings, paraMariboFee: parseFloat(e.target.value) })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Delivery Fee - Outside Paramaribo (SRD)
            </label>
            <input
              type="number"
              value={settings.outsideParaMariboFee}
              onChange={(e) =>
                setSettings({ ...settings, outsideParaMariboFee: parseFloat(e.target.value) })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-primary-main"
            />
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
