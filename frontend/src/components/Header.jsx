import { useState } from "react";
import { Bars3Icon } from '@heroicons/react/24/solid';
import { BellIcon, ChatBubbleBottomCenterTextIcon,ChartBarIcon  } from '@heroicons/react/24/solid';
import { Link } from "react-router-dom";

export function Header({ toggleSidebar }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center rounded-lg h-16 border-b border-gray-500">

<div className="flex items-center">
    <button onClick={toggleSidebar} className="w-6 h-6 text-white">
      <Bars3Icon />
    </button>

    <Link to="/" className="ml-4 flex items-center h-full">
      <img 
        src="/assets/dashboard.png" 
        alt="Logo" 
        className="h-10 w-auto object-contain" 
      />
    </Link>
  </div>

      <div className="text-lg font-bold"></div>
      <div className="flex gap-4 items-center">
        {/* Dashboard button */}
        <button className="w-8 h-8">
          <ChartBarIcon className="w-full h-full" />
        </button>

        {/* AI page button */}
        <button className="w-8 h-8 text-white">
          <ChatBubbleBottomCenterTextIcon className="w-full h-full" />
        </button>

        {/* Notification bell */}
        <button className="w-8 h-8 text-white">
          <BellIcon className="w-full h-full" />
        </button>

        <div className="relative">
          <div
            className="w-8 h-8 bg-gray-600 rounded-full cursor-pointer flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            JD
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
              <ul className="flex flex-col text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}