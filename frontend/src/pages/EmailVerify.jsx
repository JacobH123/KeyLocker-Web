import { LoginHeader } from "../components/LoginHeader";
import { useState } from "react";
import { useAuth } from "../components/RouteProtection";
import { useNavigate } from 'react-router-dom';


export default function EmailVerify() {
  const [verification_code, setverification_code] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleVerify = async () => {
    setError(null);
    try{
      const res = await fetch("http://127.0.0.1:5000/emailverify", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({verification_code}),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Login response data:", data);


        // Store the temporary token for password creation
        sessionStorage.setItem("temp_token", data.temp_token)

        login(data.user)
        navigate("/createpassword");
      }else {
        const errorData = await res.json();
        setError(errorData.error || "Verification failed");
      }


    }catch (err) {
      console.error("Verification error:", err);
      setError("Network error");
    }
  }




  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white">
      {/* Full-width top header */}
      <LoginHeader />

      {/* Centered container for Login title + card */}
      <div className="flex flex-1 flex-col justify-center items-center space-y-6">
        {/* Login heading just above the card */}
        <h2 className="text-3xl font-semibold">Verify Email</h2>

        {/* Login card */}
        <div className="bg-[#2e2e3a] p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Email Verification Code"
              value={verification_code}
              onChange={(e) => setverification_code(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#1a1a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />

            <button 
            disabled={!verification_code}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
            onClick={handleVerify}
            >
              Verify
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
