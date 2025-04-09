
  import { useState } from "react";
import { IconX } from "@tabler/icons-react";

export default function HamburgerMenu( { }) {
  const [toggle, setToggle] = useState(false);

  function handleHamburgerMenu() {
    setToggle(!toggle);
    
  }

  return (
    <>
      {/* dividi button e la modal del menu  */}
      <button onClick={handleHamburgerMenu} className="z-50 p-2">
        {toggle ? (
          <IconX stroke={2} color="#2B4F76" size={30} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={35}
            height={24}
            viewBox="0 0 35 24"
            fill="none"
          >
            <path
              d="M15.2578 12H24.1287H32.9995M4.37475 2.5H17.4995M26.9995 21.5H30.6247M2.25781 12H10.4995M22.4993 2.5H30.6247M4.37451 21.5H21.9995"
              stroke="#2B4F76"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {/* divisione del menue da aggiornare proprietà grafiche */}
      <div
        className={`fixed top-0 left-0 w-full min-h-screen bg-yellow-100 text-blue-800 flex flex-col justify-center items-center 
        transition-transform duration-500 ease-in-out transform ${
          toggle ? "translate-x-0" : "-translate-x-full"
        } z-40`}
      >
        <ul className="text-2xl space-y-6">
          <li className="p-2 text-center">Accedi</li>
          <li className="p-2 text-center">Registrati</li>
          <li className="p-2 text-center">Assistenza</li>
          <li className="p-2 text-center">Termini e condizioni</li>
          <li className="p-2 text-center">Privacy</li>
          <li className="p-2 text-center">Lingue</li>
        </ul>
      </div>
    </>
  );
}