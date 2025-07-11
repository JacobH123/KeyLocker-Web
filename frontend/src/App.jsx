
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { HomeHeader } from "./components/HomeHeader";
import { Sidebar } from "./components/Sidebar";

import Settings from "./pages/Settings";
import HomePage from "./pages/HomePage";

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // start open if you want it visible by default

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black">
        {/* Header stays at the top */}
        <HomeHeader/>
          <main className="flex-1 bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        
      </div>
    </Router>
  );
};