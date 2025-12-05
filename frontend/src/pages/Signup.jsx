import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoginHeader } from "../components/LoginHeader";
import { API_URL } from '../config';


export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignup = async () => {
    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    setError(null);
    setIsLoading(true);
    
    try {
      const res = await fetch(`${API_URL}/signup`, {  
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Signup response:", data);
        
        // Navigate to email verification page with the email
        navigate("/emailverify", { 
          state: { email: email }
        });
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white">
      <LoginHeader />

      <div className="flex flex-1 flex-col justify-center items-center space-y-6">
        <h2 className="text-3xl font-semibold">Create an account</h2>

        <div className="bg-[#2e2e3a] p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="space-y-4">
          {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full px-4 py-2 rounded bg-[#1a1a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
              onClick={handleSignup}
              disabled={isLoading}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
