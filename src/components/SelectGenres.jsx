import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { IconChevronUp } from "@tabler/icons-react";
import { IconCheck } from "@tabler/icons-react";
import clsx from "clsx";

export default function SelectGenres({
  selectTitle,
  paragraph,
  placeholder,
  dataSelect,
  arraySelectedItems,
  toggleItems,
}) {
  // Stato per il dropdown
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-secondary-brand font-script-semibold text-sm">
        {selectTitle}
      </span>
      <p className="text-[14px] font-script text-secondary-brand pb-1.5">
        {paragraph}
      </p>

      {/* Area di selezione che attiva l'apertura del dropdown */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-3 pr-4.5 border-2 border-stroke-brand rounded-4xl bg-white focus:outline-none focus:ring-primary-brand focus:border-primary-brand transition-all flex justify-between items-center"
      >
        <span className="text-gray-500 text-sm">
          {arraySelectedItems.length === 0 ? placeholder : join(", ")}
        </span>

        <div className="flex items-center">
          {!isOpen && <IconChevronDown stroke={1.2} />}
          {isOpen && <IconChevronUp stroke={1.2} />}
        </div>
      </div>

      {/* Dropdown menu personalizzato */}
      {isOpen && (
        <div className="w-full rounded-[10px] shadow-lg mt-2 max-h-50 overflow-scroll">
          <ul>
            {dataSelect.map((dataItem) => (
              <li
                key={dataItem.id}
                className={clsx(
                  "flex justify-between px-4 py-2 text-sm cursor-pointer font-script text-secondary-brand hover:bg-gray-100",
                  arraySelectedItems.includes(dataItem.id) && "bg-gray-100"
                )}
                onClick={() => toggleItems(dataItem.id)} // Cliccando sull'elemento si seleziona/deseleziona
              >
                {dataItem.name}
                {arraySelectedItems.includes(dataItem.id) && (
                  <IconCheck stroke={1.2} />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
