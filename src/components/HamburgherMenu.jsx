import { useState } from "react";
import { IconX } from "@tabler/icons-react";

export default function HamburgerMenu() {
  const [toggle, setToggle] = useState(false);

  function handleHamburgherMenu() {
    setToggle(!toggle);
  }

  return (
    <div className="flex items-center ">
      <button
        className="fixed left-0 top-0 z-50"
        type="button"
        onClick={handleHamburgherMenu}
      >
        {toggle ? (
          <IconX stroke={2} color="rgb(43, 79, 118)" size={30} />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={35}
            height={24}
            viewBox="0 0 35 24"
            fill="none"
          >
            <path
              id="Vector"
              d="M15.2578 12H24.1287H32.9995M4.37475 2.5H17.4995M26.9995 21.5H30.6247M2.25781 12H10.4995M22.4993 2.5H30.6247M4.37451 21.5H21.9995"
              stroke={"#2B4F76"}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div
        className={`fixed top-0 w-full h-full bg-yellow-100 text-blue-800 flex flex-col justify-center z-49 
          transition-all duration-500 ease-in-out ${
            toggle ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
          }`}
      >
        {toggle && (
          <ul className="text-2xl space-y-6">
            <li className="p-2 text-center">Accedi</li>
            <li className="p-2 text-center">Registrati</li>
            <li className="p-2 text-center">Assistenza</li>
            <li className="p-2 text-center">Termini e condizioni</li>
            <li className="p-2 text-center">Privacy</li>
            <li className="p-2 text-center">Lingue</li>
          </ul>
        )}
      </div>
    </div>
  );
}