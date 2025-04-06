import { useState } from "react";

function Card({ story }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div>
      <li
        key={story.id}
        className="w-[150px] h-[300px] border-transparent rounded-2xl  mt-8 flex flex-col items-center">
        <img
          src={story.cover_image}
          alt="Book cover"
          width={150}
          height={230}
          className="border-transparent rounded-2xl   hover:cursor-pointer"
          
        />
        {showTooltip && (
          <div className="relative">
            <span className="absolute bottom-1 text-center whitespace-nowrap left-1/2 transform -translate-x-1/2  bg-transparent text-secondary-brand p-2 text-xs rounded  ">
              {story.title}
            </span>
          </div>
        )}
        <div>
          <span
            className="font-medium text-[16px] text-center text-secondary-brand truncate w-[100px] overflow-hidden block whitespace-nowrap mt-2  hover:cursor-pointer  "
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}>
            {story.title}
          </span>
        </div>

        <p className="font-light font text-[12px] text-secondary-brand secondary-brand  hover:cursor-pointer ">
          {story.userId}
        </p>
      </li>
    </div>
  );
}
export default Card;
