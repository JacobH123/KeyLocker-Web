import { LoginHeader } from "../components/LoginHeader";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from "../components/RouteProtection";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Login response data:", data);
        
        
        login(data.user);
        navigate("/passwords");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white">
      {/* Full-width top header */}
      <LoginHeader />

      {/* Centered container for Login title + card */}
      <div className="flex flex-1 flex-col justify-center items-center space-y-6">
        {/* Login heading just above the card */}
        <h2 className="text-3xl font-semibold">Log In to KeyLocker</h2>

        {/* Login card */}
        <div className="bg-[#2e2e3a] p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#1a1a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#1a1a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            
            {/* Error message */}
            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}
            
            <button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
              onClick={handleLogin}
            >
              Log In 
            </button>

            {/* Sign up prompt below */}
            <p className="mt-6 text-sm text-center text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-400 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}