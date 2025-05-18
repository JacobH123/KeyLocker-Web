export default function Settings() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      {/* User Profile Section */}
      <div className="bg-[#1a1a2e] p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">User Profile</h2>
        <div className="flex gap-4">
          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
            JD
          </div>
          <div>
            <p className="text-lg text-white">Username: John Doe</p>
            <p className="text-sm text-gray-400">Email: johndoe@example.com</p>
          </div>
        </div>
      </div>

      {/* Account Settings Section */}
      <div className="bg-[#1a1a2e] p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-white">Change Password</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Edit</button>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-white">Two-Factor Authentication</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Enable</button>
          </div>
        </div>
      </div>

      {/* Notification Settings Section */}
      <div className="bg-[#1a1a2e] p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-white">Email Notifications</p>
            <input type="checkbox" className="form-checkbox text-blue-600" />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-white">SMS Notifications</p>
            <input type="checkbox" className="form-checkbox text-blue-600" />
          </div>
        </div>
      </div>

      {/* Theme Settings Section */}
      <div className="bg-[#1a1a2e] p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Theme Settings</h2>
        <div className="flex gap-4 items-center">
          <p className="text-white">Dark Mode</p>
          <input type="checkbox" className="form-checkbox text-blue-600" />
        </div>
      </div>

      {/* Logout Button */}
      <div className="text-center">
        <button className="w-1/2 mx-auto py-2 bg-red-600 text-white rounded-lg mt-6">
          Logout
        </button>
      </div>
    </div>
  );
}
