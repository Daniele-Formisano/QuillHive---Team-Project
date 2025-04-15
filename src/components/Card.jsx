import { useState } from "react";
import { useSelector } from "react-redux";
import BookModal from "./BookModal";
import { useGetUserByIdQuery } from "../services/apiService";
import Loader from "./Loader";

function Card({ story }) {
  // props passate da Home.jsx
  // const [showTooltip, setShowTooltip] = useState(false);

  const { data: author, isLoading } = useGetUserByIdQuery(story.userId);
  const { user: loggedUser } = useSelector((state) => state.global);

  const [selectedStory, setSelectedStory] = useState(null);

  if (isLoading) return <Loader />;

  return (
    <div className="inline-flex justify-center">
      <li
        key={story.id}
        className="w-[150px] h-[300px] border-transparent rounded-2xl  mt-8 flex flex-col items-center">
        <img
          src={story.cover_image}
          alt="Book cover"
          width={150}
          height={230}
          className="border-transparent rounded-2xl w-[150px] h-[230px]   hover:cursor-pointer"
          onClick={() => setSelectedStory(story)}
        />

        {/* {showTooltip && (
          <div className="relative">
            <span className="absolute bottom-[-22px] text-center whitespace-nowrap left-1/2 transform -translate-x-1/2  bg-transparent text-secondary-brand p-2 text-xs rounded  ">
              {story.title}
            </span>
          </div>
        )} */}
        <div>
          <span
            className="font-medium text-[16px] text-center text-secondary-brand  w-[100px] block leading-none mt-2  hover:cursor-pointer  "
            // onMouseEnter={() => setShowTooltip(true)}
            // onMouseLeave={() => setShowTooltip(false)}
          >
            {story.title}
          </span>
        </div>

        <p className="font-light font text-[12px] text-secondary-brand secondary-brand  hover:cursor-pointer ">
          {isLoading ? "Wait a second!" : author?.username || "not defined"}
        </p>
      </li>
      <BookModal
        story={selectedStory}
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
        user={loggedUser}
        author={author}
      />
    </div>
  );
}
export default Card;
