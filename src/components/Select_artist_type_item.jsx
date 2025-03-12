import clsx from "clsx";
import { useState } from "react";

export default function Select_artist_type_item({ role, svg }) {
  const [checked, setChecked] = useState(false); // POI SI PASSA ALLA PAGE

  const handleClick = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <label
      className="group flex items-center m-6 cursor-pointer rounded-full relative "
      onClick={handleClick}
    >
      <input
        type="checkbox"
        value={role.toLowerCase()}
        name="artist_type"
        id={role.toLowerCase()}
        checked={checked}
        onChange={handleClick}
        className="opacity-0 absolute"
      />

      <div className="absolute group-hover:scale-115 duration-150 flex justify-center items-center z-20 transform -translate-x-5">
        {svg}
      </div>

      <span
        className={clsx(
          "flex font-script justify-center items-center font-medium border-3 rounded-full border-secondary-brand w-[230px] h-[33px] relative z-10",
          checked
            ? "bg-secondary-brand text-primary-brand"
            : " text-secondary-brand "
        )}
      >
        {role}
      </span>
    </label>
  );
}
