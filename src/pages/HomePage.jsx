import React from 'react';

export default function HomePage() {
  
  const currentUser = "John Doe"; // TODO add user data later

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white p-4">
      {/* Logo */}
      <img src="/assets/dashboard.png" alt="Logo" className="w-48 h-48 object-contain mb-8" />

      {/* Welcome message */}
      <h1 className="text-3xl font-semibold mb-4">Welcome Back, {currentUser}!</h1>

      {/* Dashboard info */}
      <p className="text-lg mb-6">Your personalized financial dashboard is ready to explore. Here's a quick overview:</p>

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

      {/* CTA - Call to Action */}
      <div className="bg-blue-600 p-4 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-xl font-bold text-white mb-4">Start Planning Your Future</h2>
        <p className="text-white mb-4">Get personalized insights and set financial goals today.</p>
        <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg">Get Started</button>
      </div>
    </div>
  );
}
