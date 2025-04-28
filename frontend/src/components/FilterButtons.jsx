import clsx from "clsx";

export default function FilterButton({ optionsFilter, onClick }) {
  return (
    <div className="border-2 border-stroke-brand rounded-4xl grid grid-cols-3 p-2 font-script text-sm bg-white text-secondary-brand">
      {optionsFilter.map((optionFilter) => (
        <button
          key={optionFilter.text}
          onClick={() => onClick(optionFilter.text)}
          className={clsx(
            "transition-all p-2 rounded-4xl",
            optionFilter.active && "bg-primary-brand"
          )}
        >
          {optionFilter.text}
        </button>
      ))}
    </div>
  );
}
