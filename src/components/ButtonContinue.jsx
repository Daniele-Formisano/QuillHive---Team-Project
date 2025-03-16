import clsx from "clsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonContinue() {
  const [selected, isSelected] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    isSelected(!selected);
    navigate("/nuova-pagina");
  };

  return (
    <div>
      <button
        onClick={handleClick}
        type="submit"
        className={clsx(
          "flex font-script justify-center items-center font-medium rounded-full w-full h-[40px] bg-primary-brand text-secondary-brand ",
          selected
            ? " bg-none border-primary-brand border-2 "
            : " bg-primary-brand "
        )}
      >
        Continue
      </button>
    </div>
  );
}
