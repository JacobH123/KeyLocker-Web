
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import AIAssistant from "./pages/AIAssistant";
import Settings from "./pages/Settings";
import Trends from "./pages/Trends";
import BudgetPlans from "./pages/BudgetPlans";
import Goals from "./pages/Goals";
import HomePage from "./pages/HomePage";
export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // start open if you want it visible by default

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black">
        {/* Header stays at the top */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Below the header, flex row: sidebar + main */}
        <div className="flex flex-1">
          {/* Sidebar that slides in/out but doesn't overlap header */}
          <Sidebar isOpen={sidebarOpen} />

          {/* Main content */}
          <main className="flex-1 bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/aiassiant" element={<AIAssistant />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/budgets" element={<BudgetPlans />} />
              <Route path="/trends" element={<Trends />} />
              <Route path="/goals" element={<Goals />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};