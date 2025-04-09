import SaveButton from "./ButtonSave";
import { IconBookmark } from "@tabler/icons-react";
import { IconBook } from "@tabler/icons-react";
import { IconMinusVertical } from "@tabler/icons-react";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";

export default function BookInfoList({ story }) {
  const navigate = useNavigate();
  const { id } = useParams();

  function handleClick() {
    navigate(`/story/${id}/read-story`);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Sezione che contiene la copertina del libro, il suo titolo e autore + buttonSave */}
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <img
            src={story.cover_image}
            width={150}
            height={230}
            className="border-transparent rounded-2xl "
          />
          <div className="absolute -bottom-4.5 -right-4.5">
            <SaveButton />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-script font-bold text-secondary-brand">
            {story.title}
          </h2>
          <h4 className="font-script-semibold font-medium text-secondary-brand">
            {story.authorName || "Autore sconosciuto"}
          </h4>
        </div>
      </div>

      {/* Sezione che contiene le info del libro  */}
      <div className="grid grid-cols-[1fr_auto_1fr] px-25 justify-center text-center">
        {/* Colonna sinistra: Saved */}
        <div className="flex flex-col items-center justify-center font-script text-secondary-brand">
          <IconBookmark stroke={2} color="#203955" size={32} />
          <p>Saved</p>
          <p className="font-extrabold">{story.likes}</p>
        </div>

        {/* Colonna centrale: Icona verticale */}
        <div className="flex justify-center items-center">
          <svg
            width="36"
            height="100%"
            viewBox="0 0 36 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <rect x="17" y="0" width="3" height="100%" fill="#203955" rx="3" />
          </svg>
        </div>

        {/* Colonna destra: Chapters */}
        <div className="flex flex-col items-center justify-center font-script text-secondary-brand">
          <IconBook stroke={2} color="#203955" size={32} />
          <p>Chapters</p>
          <p className="font-extrabold">{story.chapters || 1}</p>
        </div>
      </div>

      {/* Sezione che contiene il plot del libro */}
      <div className="flex flex-col justify-center items-center font-script-semibold text-secondary-brand px-10">
        <h5 className="self-start text-2xl">Plot</h5>
        <p>{story.plot}</p>
      </div>

      {/* Sezione che contiene i bottoni */}
      <div className="flex px-14 h-[40px]">
        <Button onClick={handleClick} type="button" isColorYellow={true}>
          Start reading
        </Button>
      </div>
    </div>
  );
}
