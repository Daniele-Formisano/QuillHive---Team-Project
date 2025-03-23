import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { IconChevronUp } from "@tabler/icons-react";
import { IconCheck } from "@tabler/icons-react";
import clsx from "clsx";

export default function SelectGenres({ genres, storyGenres, toggleGenre }) {
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
          {storyGenres.length === 0 ? "Select genres" : storyGenres.join(", ")}
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
                className={clsx(
                  "px-4 py-2 text-sm cursor-pointer font-script text-secondary-brand hover:bg-gray-100",
                  storyGenres.includes(genre.id)
                    ? "bg-secondary-brand text-primary-brand"
                    : "text-secondary-brand"
                )}
                onClick={() => toggleGenre(genre.name)} // Cliccando sull'elemento si seleziona/deseleziona
              >
                {genre.name}
                {storyGenres.includes(genre.id) && <IconCheck stroke={1.2} />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
