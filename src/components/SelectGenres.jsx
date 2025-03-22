import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { IconChevronUp } from "@tabler/icons-react";

export default function SelectGenres({ genres, selectedGenres, toggleGenre }) {
  // Stato per il dropdown
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <span className="text-secondary-brand font-script text-[25px]">
        Add Tags
      </span>

      {/* Area di selezione che attiva l'apertura del dropdown */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 pr-4.5 border-2 border-stroke-brand rounded-4xl bg-white focus:outline-none focus:ring-primary-brand focus:border-primary-brand transition-all flex justify-between items-center"
      >
        <span className="text-gray-500 text-sm">
          {selectedGenres.length === 0
            ? "Select genres"
            : selectedGenres.join(", ")}
        </span>

        <div className="flex items-center">
          {!isOpen && <IconChevronDown stroke={1.2} />}
          {isOpen && <IconChevronUp stroke={1.2} />}
        </div>
      </div>

      {/* Dropdown menu personalizzato */}
      {isOpen && (
        <div className="absolute w-full mt-2 rounded-[10px] shadow-lg">
          <ul className="overflow-y-auto">
            {genres.map((genre) => (
              <li
                key={genre.id}
                className="px-4 py-2 text-sm cursor-pointer font-script text-secondary-brand hover:bg-gray-100"
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
