import { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
export default function Passwords() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  return (

  <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white">
    <Header toggleSidebar={toggleSidebar} />
    <Sidebar isOpen={sidebarOpen} />
    
    <main>



    </main>






  </div>

  
    );
}