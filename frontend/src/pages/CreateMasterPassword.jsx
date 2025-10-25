import { LoginHeader } from "../components/LoginHeader";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../config';
import { hashPasswordForLogin } from '../cryptoHelpers';

export default function CreateMasterPassword() {

  const [password, setPassword] = useState("");   
  const [error, setError] = useState(null);       
  const navigate = useNavigate();

  const handleCreatePassword = async () => {
    setError(null);
    const temp_token = sessionStorage.getItem("temp_token");
    const email = sessionStorage.getItem("user_email");
    try {

      const hashedPassword = await hashPasswordForLogin(password, email);

      const res = await fetch(`${API_URL}/createPassword`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({temp_token, password: hashedPassword }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Password successfully created:", data);

        sessionStorage.removeItem("temp_token");
        sessionStorage.removeItem("user_email");

        navigate("/login");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
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
        <h2 className="text-3xl font-semibold">Create Master Password</h2>

        {/* Login card */}
        <div className="bg-[#2e2e3a] p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter Master Password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#1a1a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            
            <button 
            disabled={!password}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
            onClick = {handleCreatePassword}
            >
              Create 
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
