import { useState } from "react";
import { Menu, User, Settings, LogOut, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from '../config';
import { useAuth } from "../components/RouteProtection";


export function Header({ toggleSidebar }) {
  const { user } = useAuth();
  const userEmail = user?.email || "guest@example.com";
  const userName = user?.name || userEmail.split('@')[0];
  const userInitials = userName.slice(0, 2).toUpperCase();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  

  const [notification, setNotification] = useState(null);
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("sessionToken");
    try {
      const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: { 
            "Authorization": `Bearer ${token}`
            }
      });
  
      if (res.ok) {
        localStorage.removeItem("sessionToken");
        navigate("/login");
      } else {
        showNotification('Failed to logout');
      }
    } catch (err) {
      showNotification('Failed to logout');
    }
  };

  const handleMenuClick = (action) => {
    
    if (action === 'profile') {
      // Navigate to profile or handle profile action
      console.log('Profile clicked');
    } else if (action === 'settings') {
      navigate('/settings');
    } else if (action === 'logout') {
      handleLogout();
      console.log('Logout clicked');
    }
    setIsOpen(false);
  };
    


  return (
    <header className="bg-black text-white p-4 flex justify-between items-center rounded-lg h-16 border-b border-gray-700">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="w-6 h-6 text-white hover:text-purple-400 transition"
        >
          <Menu className="w-6 h-6" />
        </button>

        <Link to="/passwords" className="ml-4 flex items-center h-full">
          <img 
            src="/assets/KeyLock_Transparent.png" 
            alt="Keylocker Logo" 
            className="h-40 w-auto object-contain" 
          />
        </Link>
      </div>

      {/* Right side - User Menu */}
      <div className="flex gap-4 items-center">
        <div className="relative">
          {/* User Avatar Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition group"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {userInitials}
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <>
              {/* Backdrop to close dropdown when clicking outside */}
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsOpen(false)}
              />
              
              <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-gray-700 rounded-xl shadow-2xl z-20 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              >
                {/* User Info Header */}
                <div className="px-4 py-3 bg-slate-900 border-b border-gray-700">
                  <p className="font-semibold text-white">{userInitials}</p>
                  <p className="text-xs text-gray-400">{userEmail}</p>
                </div>

                {/* Menu Items */}
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => handleMenuClick('profile')}
                      className="w-full px-4 py-2.5 hover:bg-slate-700 transition flex items-center gap-3 text-left text-sm"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      <span>Profile</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleMenuClick('settings')}
                      className="w-full px-4 py-2.5 hover:bg-slate-700 transition flex items-center gap-3 text-left text-sm"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span>Settings</span>
                    </button>
                  </li>
                  
                  {/* Divider */}
                  <li className="my-2 border-t border-gray-700"></li>
                  
                  <li>
                    <button
                      onClick={() => handleMenuClick('logout')}
                      className="w-full px-4 py-2.5 hover:bg-red-500/10 transition flex items-center gap-3 text-left text-sm text-red-400 hover:text-red-300"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}