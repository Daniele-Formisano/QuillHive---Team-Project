import { IconList, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function HamburgerForChapters({ chapters }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        <IconList stroke={1.5} size={40} color="#203955" />
      </button>

      <div
        className={`fixed bottom-0 left-0 w-full min-h-screen font-script-bold bg-bg-brand text-secondary-brand z-40
          transition-transform duration-500 ease-in-out transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="min-h-screen flex flex-col gap-30">
          <button type="button" onClick={handleClick} className="p-2">
            <IconX size={35} />
          </button>

          <div className="flex flex-col grow gap-10">
            <h1 className="text-center text-3xl">
              {chapters.length === 1 ? "Chapter:" : "Chapters:"}
            </h1>
            <div>
              <div>
                <ol className="flex flex-col list-decimal justify-center items-center space-y-7">
                  {chapters.map((chapter) => (
                    <li
                      key={chapter.id}
                      onClick={handleClick}
                      className="text-xl font-script-semibold"
                    >
                      <Link
                        to={`/story/${chapter.storyId}/read-story/chapter/${chapter.order}`}
                      >
                        {chapter.title}
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
