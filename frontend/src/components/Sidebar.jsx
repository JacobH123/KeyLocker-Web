import { Link } from "react-router-dom";
import { ChatBubbleBottomCenterTextIcon,ChartBarIcon, Cog6ToothIcon,CreditCardIcon,ArrowTrendingUpIcon  } from '@heroicons/react/24/solid';
export function Sidebar({ isOpen }) {
    return (
      <aside
      className={`
        bg-[#0d1117] text-white w-64 p-4 transition-all duration-300 ease-in-out border-r border-gray-500
        ${isOpen ? "ml-0" : "-ml-64 "}
      `}
    >


        <nav>
          <ul className="flex flex-col gap-4">
          <li>
            <Link to="/aiassiant" className="hover:text-white flex items-center gap-2">
              <ChatBubbleBottomCenterTextIcon className="w-5 h-5" />
              AI Assistant
            </Link>
         </li>

         <li>
              <Link to="/goals" className="hover:text-white flex items-center gap-2">
              <ArrowTrendingUpIcon  className="w-5 h-5" />
              Financial Goals
              </Link>
            </li>
            <li>
              <Link to="/budgets" className="hover:text-white flex items-center gap-2">
              <CreditCardIcon className="w-5 h-5" />
              Budget Plans
              </Link>
            </li>
            <li>
              <Link to="/trends" className="hover:text-white flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5" />
              Trends
              </Link>
            </li>
            <li>
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
  