import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Downloads from './pages/Downloads';
import Settings from "./pages/Settings";
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import Updates from './pages/UpdatePage';
import MainContent from './pages/MainContent';
export const App = () => {

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black">

          <main className="flex-1 bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white  overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/updates" element={<Updates/>} />
              <Route path="/passwords" element={<MainContent/>} />
            </Routes>
          </main>
        
      </div>
    </Router>
  );
};