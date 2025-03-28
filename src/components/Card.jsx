import { useState } from "react";
import { useGetStoriesQuery } from "../services/apiService";

function Card({ story }) {
  // const stories = data.stories.slice(0,1);//riduzio dell'array, fetch momentaneo
  //   const { data: stories, error, isLoading } = useGetStoriesQuery();

  //   if (isLoading) return <p>Loading</p>;
  //   if (error) return <p>Error </p>;
  //   if (!stories || stories.length === 0) return <p>No stories</p>;

  //  const limitedStories= stories.slice(0,7);

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div>
      {/* <ul>
        {stories.map((story) => ( */}
      <li
        key={story.id}
        className="w-[150px] h-[290px] border-transparent rounded-2xl flex flex-col items-center mt-8 relative">
        <img
          src={story.cover_image}
          alt="Book cover"
          width={150}
          height={230}
          className="border-transparent rounded-2xl "
        />
        <p
          className="font-medium text-[16px] text-center text-secondary-brand truncate w-[100px] mt-3.5"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}>
          {story.title}
          {showTooltip && (
            <span className="absolute bottom-10 bg-black text-white p-1 text-xs rounded z-10">
              {story.title}
            </span>
          )}
        </p>

        <p className="font-light font text-[12px] text-secondary-brand secondary-brand mt-2">
          {story.userId}
        </p>
        {/* momentaneo perchè autore sarebbe user_id */}
      </li>

      {/* </ul> */}
    </div>
  );
}
export default Card;
