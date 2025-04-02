import { IconPencil } from "@tabler/icons-react";
import { IconChevronDown } from "@tabler/icons-react";
import { IconChevronUp } from "@tabler/icons-react";
import { IconCircleDashedPlus } from "@tabler/icons-react";
import { useState } from "react";

export default function (handleAddChapter) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center pb-2">
      <IconPencil stroke={2} />
      <div
        className="flex gap-2 items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="font-script">Chapter</h2>
        <div>
          {!isOpen && <IconChevronDown stroke={2} />}
          {isOpen && <IconChevronUp stroke={2} />}
        </div>

        {/* Dropdown menu personalizzato */}
        {isOpen && (
          <div className="w-[7rem] rounded-[10px] shadow-lg mt-2 overflow-x-hidden">
            <ul className="font-script flex flex-col p-4 pr-4 pt-2 pb-2 gap-1.5 text-sm text-secondary-brand">
              <li className="flex justify-between cursor-pointer hover:bg-gray-100 ">
                Chap
                <span>1</span>
              </li>
              <IconCircleDashedPlus stroke={2} onClick={handleAddChapter} />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
