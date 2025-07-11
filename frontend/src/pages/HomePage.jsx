import React from 'react';

export default function HomePage() {
  


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white p-4">
      {/* Logo */}
      <img src="/assets/KeyLock_Transparent.png" alt="Logo" className="w-96 h-68 object-contain mb-8" />

      {/* Welcome message */}
      <p className="text-2xl mb-12">Welcome to KeyLocker! The Secure Password Manager</p>

      <div className="flex gap-8 mb-12">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-64 text-center">
          <h2 className="font-bold text-xl">Account Overview</h2>
          <p className="mt-2">Check your balances, transactions, and activity.</p>
        </div>
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-64 text-center">
          <h2 className="font-bold text-xl">Financial Trends</h2>
          <p className="mt-2">Analyze your spending and savings patterns.</p>
        </div>
      </div>

    </div>
  );
}
