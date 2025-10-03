// Update MainContent.jsx to accept children or a component prop
import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export default function MainContent({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        {children}
      </div>
    </div>
  );
}

