import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Downloads from './pages/Downloads';
import Settings from "./components/Settings";
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import Updates from './pages/UpdatePage';
import MainContent from './pages/MainContent';
import EmailVerify from "./pages/EmailVerify";
import Vault from "./components/Vault";
import CreateMasterPassword from "./pages/CreateMasterPassword";
import { AuthProvider, ProtectedRoute } from './components/RouteProtection';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-black">
          <main className="flex-1 bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white overflow-auto">
            <Routes>
              {/* Public routes */}
              {/*1. When the user opens the website URL, it displays the initial landing page  */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/emailverify" element={<EmailVerify />} />
              <Route path="/createpassword" element={<CreateMasterPassword />} />
              <Route path="/passwords" element={<MainContent><Vault /></MainContent>} />
              <Route path="/settings" element={<MainContent><Settings /></MainContent>} />

              {/* Protected routes */}
              {/* 
              <Route path="/passwords" element={
                <ProtectedRoute>
                  <MainContent />
                </ProtectedRoute>
              } />
               */}



            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};
