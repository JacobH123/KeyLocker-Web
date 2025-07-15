import { Link } from "react-router-dom";
import { Cog6ToothIcon,WalletIcon } from '@heroicons/react/24/solid';
export function Sidebar({ isOpen }) {
    return (
      <aside
      className={`
        bg-[#0d1117] text-white w-64 p-4 h-screen transition-all duration-300 ease-in-out border-r border-gray-500
        ${isOpen ? "ml-0" : "-ml-64 "}
      `}
    >


        <nav>
          <ul className="flex flex-col gap-4">
            <li>
              <Link to="/passwords" className="hover:text-white flex items-center gap-2">
              <WalletIcon className="w-5 h-5" />
              Passwords
              </Link>
              <Link to="/settings" className="hover:text-white flex items-center gap-2">
              <Cog6ToothIcon className="w-5 h-5" />
              Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    );
  }
  