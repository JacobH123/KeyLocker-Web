import { useState } from "react";
import { Link } from "react-router-dom";


export function HomeHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-black text-white p-4 flex justify-between items-center rounded-lg h-16 border-b border-gray-500">

<div className="flex items-center">

    <Link to="/" className="ml-4 flex items-center h-full">
      <img 
        src="/assets/KeyLock_Transparent.png" 
        alt="Logo" 
        className="h-40 w-auto object-contain" 
      />
    </Link>
  </div>

    </header>
  );
}