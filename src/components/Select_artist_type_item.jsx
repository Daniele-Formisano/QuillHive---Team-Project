import clsx from "clsx";
import { useState } from "react";

export default function Select_artist_type_item({ role, svg }) {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  return (
    <label
      className="flex items-center m-6 cursor-pointer rounded-full relative "
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

      <div className="absolute flex justify-center items-center z-20 transform -translate-x-5">
        {svg}
      </div>

      <span
        className={clsx(
          "flex justify-center items-center text-secondary-brand font-medium border-3 rounded-full border-secondary-brand w-[230px] h-[33px] relative z-10",
          checked && "bg-secondary-brand text-primary-brand"
        )}
      >
        {role}
      </span>
    </label>
  );
}
