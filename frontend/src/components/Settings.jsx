import { useState } from "react";
import { 
  User,
  Shield,
  Bell,
  Moon,
  Key,
  Lock,
  Mail,
  Smartphone,
  LogOut,
  ChevronRight,
  Check,
  AlertCircle
} from "lucide-react";

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = (setting) => {
    showNotification(`${setting} updated successfully!`);
  };

  const handleLogout = () => {
    showNotification('Logging out...', 'info');
    // Add logout logic here
  };

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white overflow-auto">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-20 right-6 ${
          notification.type === 'success' ? 'bg-green-600' : 
          notification.type === 'error' ? 'bg-red-600' : 'bg-blue-600'
        } text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50`}>
          {notification.type === 'success' ? (
            <Check className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {notification.message}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Shield className="w-10 h-10 text-purple-500" />
            Settings
          </h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        <div className="space-y-6">
          {/* User Profile Section */}
          <div className="bg-slate-800 rounded-2xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold">User Profile</h2>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                JD
              </div>
              <div className="flex-1">
                <p className="text-lg font-semibold mb-1">John Doe</p>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  johndoe@example.com
                </p>
              </div>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-sm font-medium">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Security Section */}
          <div className="bg-slate-800 rounded-2xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold">Security</h2>
            </div>
            
            <div className="space-y-4">
              {/* Change Master Password */}
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl hover:bg-slate-900/80 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <Key className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">Master Password</p>
                    <p className="text-sm text-gray-400">Change your master password</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPasswordModal(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition text-sm font-medium flex items-center gap-2"
                >
                  Change
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Two-Factor Authentication */}
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl hover:bg-slate-900/80 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-400">
                      {twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    handleSave('Two-factor authentication');
                  }}
                  className={`px-4 py-2 ${
                    twoFactorEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-700 hover:bg-slate-600'
                  } rounded-lg transition text-sm font-medium`}
                >
                  {twoFactorEnabled ? 'Enabled' : 'Enable'}
                </button>
              </div>

              {/* Session Management */}
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl hover:bg-slate-900/80 transition">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium">Active Sessions</p>
                    <p className="text-sm text-gray-400">Manage your active devices</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-sm font-medium flex items-center gap-2">
                  View
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="bg-slate-800 rounded-2xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            
            <div className="space-y-4">
              {/* Email Notifications */}
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-400">Receive updates via email</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setEmailNotifications(!emailNotifications);
                    handleSave('Email notifications');
                  }}
                  className={`relative w-14 h-7 rounded-full transition ${
                    emailNotifications ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    emailNotifications ? 'translate-x-7' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* SMS Notifications */}
              <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-400">Receive alerts via text message</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSmsNotifications(!smsNotifications);
                    handleSave('SMS notifications');
                  }}
                  className={`relative w-14 h-7 rounded-full transition ${
                    smsNotifications ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    smsNotifications ? 'translate-x-7' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="bg-slate-800 rounded-2xl border border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Moon className="w-6 h-6 text-purple-500" />
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-gray-400">Use dark theme throughout the app</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  handleSave('Theme');
                }}
                className={`relative w-14 h-7 rounded-full transition ${
                  darkMode ? 'bg-purple-600' : 'bg-gray-600'
                }`}
              >
                <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  darkMode ? 'translate-x-7' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-slate-800 rounded-2xl border border-red-900/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-semibold">Danger Zone</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-950/30 rounded-xl border border-red-900/30">
                <div>
                  <p className="font-medium text-red-400">Delete Account</p>
                  <p className="text-sm text-gray-400">Permanently delete your account and all data</p>
                </div>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-medium">
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="w-full bg-slate-800 hover:bg-slate-700 border border-gray-700 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2 group"
          >
            <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </div>

      {/* Password Change Modal (placeholder) */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-slate-800 rounded-2xl border border-gray-700 p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6">Change Master Password</h3>
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current password"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="password"
                placeholder="New password"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    handleSave('Master password');
                  }}
                  className="flex-1 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}