import { useState } from "react";
import { useGetStoriesQuery } from "../services/apiService";

function Card({ story }) {
  

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div>
      
      <li
        key={story.id}
        className="w-[150px] h-[295px] border-transparent rounded-2xl flex flex-col items-center mt-8 ">
        <img
          src={story.cover_image}
          alt="Book cover"
          width={150}
          height={230}
          className="border-transparent rounded-2xl "
        />
        <span
          className="font-medium text-[16px] text-center text-secondary-brand truncate w-[100px] mt-3.5 "
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}>
          {story.title}
          {showTooltip && (<div>
            <span className="absolute bottom-10 bg-transparent text-secondary-brand p-1 text-xs rounded z-10">
              {story.title}
            </span></div>
          )}
        </span>

        <p className="font-light font text-[12px] text-secondary-brand secondary-brand ">
          {story.userId}
        </p>
        
      </li>

      {/* </ul> */}
    </div>
  );
}
export default Card;
