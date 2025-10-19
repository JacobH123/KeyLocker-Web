import { BrowserRouter as Router, Routes, Route,useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
import { AuthProvider, ProtectedRoute,EmailVerifyRoute,TempTokenRoute } from './components/RouteProtection';
import { RedirectIfLoggedIn } from "./components/RouteProtection";

export const App = () => {

  return (
    <AuthProvider>
      <Router>
        {/* <RedirectIfLoggedIn />*/}
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

              {/* Signup flow routes */}
              <Route path="/emailverify" element={<EmailVerifyRoute><EmailVerify /> </EmailVerifyRoute>}/>
              <Route path="/createpassword"element={<TempTokenRoute><CreateMasterPassword /> </TempTokenRoute>}/>

              {/* Protected login routes*/}
              <Route path="/passwords" element={<ProtectedRoute><MainContent><Vault /></MainContent></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><MainContent><Settings /></MainContent></ProtectedRoute>} />



            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};
