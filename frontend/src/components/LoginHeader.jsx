import { Link } from "react-router-dom";


export function LoginHeader() {
  return (
    <header className="w-full  text-white p-4 flex justify-between items-center rounded-lg h-16  ">

<div className="flex items-center">

    <Link to="/" className="ml-4 flex items-center h-full">
      <img 
        src="/assets/logoTest.png" 
        alt="Logo" 
        className="h-14 w-auto object-contain" 
      />
    </Link>
  </div>


    </header>
  );
}