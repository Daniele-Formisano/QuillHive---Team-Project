import { IconPencil } from "@tabler/icons-react";
import { IconChevronDown } from "@tabler/icons-react";
import { IconChevronUp } from "@tabler/icons-react";
import { IconCircleDashedPlus } from "@tabler/icons-react";
import { useState } from "react";
import { useGetChaptersByStoryIdQuery } from "../services/apiService";

export default function ChapDropdown({
  handleAddChapter,
  storyId,
  handleSelectChapter,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: chapters,
    isLoading,
    isError,
  } = useGetChaptersByStoryIdQuery(storyId);

  // Gestire la selezione di un capitolo
  const handleChapterSelect = (chapterId) => {
    const chapter = chapters.find((ch) => ch.id === chapterId && ch.id != null);
    if (!chapter) return;

    handleSelectChapter(chapter); // Passiamo il capitolo selezionato al parent
    setIsOpen(false); // Chiudiamo il menu a tendina
  };

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
              {isLoading && <li>Loading...</li>}
              {isError && <li>Error loading chapters.</li>}
              {chapters &&
                chapters.length > 0 &&
                chapters
                  .filter((chapter) => chapter.id != null)
                  .map((chapter) => (
                    <li
                      key={chapter.id}
                      className="flex justify-between cursor-pointer hover:bg-gray-100"
                      onClick={() => handleChapterSelect(chapter.id)}
                    >
                      {chapter.title}
                      <span>{chapter.order}</span>
                    </li>
                  ))}

              <IconCircleDashedPlus stroke={2} onClick={handleAddChapter} />
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
