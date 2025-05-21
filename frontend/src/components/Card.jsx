import { useState } from "react";
import { useSelector } from "react-redux";
import BookModal from "./BookModal";
import Loader from "./Loader";
import { IconBook } from "@tabler/icons-react";

function Card({ story }) {
  const { user: loggedUser } = useSelector((state) => state.global);

  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div className="inline-flex justify-center">
      <li
        key={story.id}
        className="w-[150px] h-[300px] border-transparent rounded-2xl  mt-8 flex flex-col items-center"
      >
        {story.cover_image ? (
          <img
            src={story.cover_image}
            alt="Book cover"
            width={150}
            height={230}
            className="border-transparent rounded-2xl w-[150px] h-[230px]   hover:cursor-pointer"
            onClick={() => setSelectedStory(story)}
          />
        ) : (
          <div
            onClick={() => setSelectedStory(story)}
            className="flex flex-col justify-center items-center rounded-2xl w-[150px] h-[230px] border-secondary-brand border-1 text-secondary-brand bg-primary-brand"
          >
            <IconBook stroke={2} color="#203955" />
            <span>{story.title}</span>
          </div>
        )}

        <div>
          <span className="font-medium text-[16px] text-center text-secondary-brand  w-[100px] block leading-none mt-2  hover:cursor-pointer  ">
            {story.title}
          </span>
        </div>

        <p className="font-light font text-[12px] text-secondary-brand secondary-brand  hover:cursor-pointer ">
          {story.author || "not defined"}
        </p>
      </li>
      <BookModal
        story={selectedStory}
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
        user={loggedUser}
      />
    </div>
  );
}
export default Card;
