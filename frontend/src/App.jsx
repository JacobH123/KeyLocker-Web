import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Downloads from './pages/Downloads';
import Settings from "./pages/Settings";
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import Signup from './pages/Signup';
import Updates from './pages/UpdatePage';
import MainContent from './pages/MainContent';
import EmailVerify from "./pages/EmailVerify";
import { AuthProvider, ProtectedRoute } from './components/RouteProtection';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-black">
          <main className="flex-1 bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white overflow-auto">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/updates" element={<Updates />} />
              <Route path="/emailverify" element={<EmailVerify />} />

              {/* Protected routes */}
              <Route path="/passwords" element={
                <ProtectedRoute>
                  <MainContent />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};
