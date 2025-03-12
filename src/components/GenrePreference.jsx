import clsx from "clsx";

export default function GenrePreference({ genre, selected, toggleGenre }) {
  function handleChange() {
    setSelected(!selected);
  }

  return (
    <div>
      <label className="relative hover:cursor-pointer rounded-4xl">
        <input
          className="opacity-0 absolute"
          type="checkbox"
          checked={selected}
          onChange={() => toggleGenre(genre.id)}
        />
        <span
          className={clsx(
            "rounded-4xl text-[14px] px-4 py-2 font-medium flex justify-center items-center border-2 border-secondary-brand  w-full h-full",
            selected
              ? "bg-secondary-brand text-primary-brand "
              : "border-secondary-brand text-secondary-brand"
          )}
        >
          {genre.name}
        </span>
      </label>
    </div>
  );
}
