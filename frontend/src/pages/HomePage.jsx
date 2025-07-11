import { HomeHeader } from "../components/HomeHeader";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white">
      
      {/* Header: full width, flush with viewport edges */}
      <HomeHeader />

      {/* Main content area */}
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          
          {/* Left: Logo */}
          <img
            src="/assets/logoTest.png"
            alt="Logo"
            className="w-48 md:w-96 h-auto object-contain"
          />

          {/* Right: Welcome message */}
          <h1 className="text-center md:text-left text-3xl md:text-5xl font-semibold max-w-xl">
            A minimalist open-source password manager with maximum security
          </h1>
          
        </div>
      </main>
      
    </div>
  );
}
