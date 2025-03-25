import { useState } from "react";

export default function SelectGenres({ genres }) {
  const svgUp = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 15L12 9L18 15"
        stroke="#203955"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const svgDown = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 9L12 15L6 9"
        stroke="#203955"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Stato per il dropdown
  const [isOpen, setIsOpen] = useState(false);
  // Stato per la selezione dei generi
  const [selectedGenres, setSelectedGenres] = useState([]);
  const selectStyle = {
    WebkitAppearance: "none", // NASCONDO LA FRECCIA
    MozAppearance: "none",
    appearance: "none",
    paddingRight: "18px", // Lascia spazio per la freccia personalizzata
    fontFamily: "'Intelo', sans-serif",
    fontSize: "14px",
    color: "#232323",
  };

  // Funzione per gestire la selezione e deselezione dei generi
  const toggleGenre = (genre) => {
    setSelectedGenres((prevSelected) => {
      // Se il genere è già selezionato, lo rimuoviamo, altrimenti lo aggiungiamo
      if (prevSelected.includes(genre)) {
        return prevSelected.filter((g) => g !== genre); // Rimuove il genere dalla selezione
      } else {
        return [...prevSelected, genre]; // Aggiunge il genere alla selezione
      }
    });
  };

  return (
    <div>
      <label
        htmlFor="genres"
        className="font-medium font-script text-secondary-brand mb-4"
      >
        Add Tags
      </label>

      {/* Area di selezione che attiva l'apertura del dropdown */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={selectStyle}
        className="w-full px-4 py-2 text-sm border-2 border-stroke-brand rounded-[50px] bg-white cursor-pointer flex justify-between items-center"
      >
        <span>
          {selectedGenres.length === 0
            ? "Select genres"
            : selectedGenres.join(", ")}
        </span>
        <div className="flex items-center">
          {!isOpen && svgDown}
          {isOpen && svgUp}
        </div>
      </div>

      {/* Dropdown menu personalizzato */}
      {isOpen && (
        <div
          className="absolute w-full mt-2 border-2 border-stroke-brand rounded-[10px] shadow-lg z-10 custom-scrollbar"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 0.8))",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <ul className="max-h-60 overflow-y-auto">
            {genres.map((genre) => (
              <li
                key={genre.id}
                className="px-4 py-2 text-sm cursor-pointer font-medium font-script text-secondary-brand hover:bg-gray-100"
                onClick={() => toggleGenre(genre.name)} // Cliccando sull'elemento si seleziona/deseleziona
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
