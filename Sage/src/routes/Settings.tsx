import React from 'react';
import { useAuthStore } from '../store/authStore';

export function Settings() {
  const { user } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white p-6 rounded-lg shadow max-w-2xl">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={user?.email}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Enable voice feedback</span>
                <input type="checkbox" className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Dark mode</span>
                <input type="checkbox" className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Session reminders</span>
                <input type="checkbox" className="h-4 w-4 text-indigo-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Progress updates</span>
                <input type="checkbox" className="h-4 w-4 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}