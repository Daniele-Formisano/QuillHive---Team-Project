import { useEffect, useState } from "react";
import data from "../assets/database/db.json";
import myImage from "../assets/cover.jpeg";//necessario poiche nel db.json l'image url è fittizio

function Card() {
  const stories = data.stories.slice(0,1);//riduzio dell'array, fetch momentaneo 

  useEffect;
  return (
    <div>
      <ul>
        {stories.map((story) => (
          <li key={story.id} className="w-[150px] h-[290px] border-transparent rounded-2xl flex flex-col items-center">
            <img
              src={myImage}
              alt="book image"
              width={150}
              height={230}
              className="border-transparent rounded-2xl "
            />
            <p className="font-medium text-[16px] text-secondary-brand ">{story.title}</p>
            <p className="font-light text-[12px] text-secondary-brand secondary-brand">George Orwell</p> 
            {/* momentaneo perchè autore sarebbe user_id */}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Card;
