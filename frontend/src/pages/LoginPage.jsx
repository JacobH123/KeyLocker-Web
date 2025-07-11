import { LoginHeader } from "../components/LoginHeader";

export default function LoginPage() {
  return (

    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#1a1a2e] via-black to-[#1a1a2e] text-white">
      
      {/* Header is full width, flush with viewport edges */}
      <LoginHeader />

    </div>

  
    );
}