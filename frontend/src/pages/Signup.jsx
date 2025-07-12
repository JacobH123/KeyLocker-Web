import { LoginHeader } from "../components/LoginHeader";
import { Link } from 'react-router-dom';
export default function Signup() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white">
      {/* Full-width top header */}
      <LoginHeader />

      {/* Centered container for Login title + card */}
      <div className="flex flex-1 flex-col justify-center items-center space-y-6">
        {/* Login heading just above the card */}
        <h2 className="text-3xl font-semibold">Create an account</h2>

        {/* Login card */}
        <div className="bg-[#2e2e3a] p-8 rounded-2xl shadow-lg w-full max-w-sm">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full px-4 py-2 rounded bg-[#1a1a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-[#1a1a2e] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
              Sign Up
            </button>
              
          </div>
        </div>
      </div>
    </div>
  );
}
