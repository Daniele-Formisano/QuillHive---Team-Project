import clsx from "clsx";

export default function GenrePreference({ genre, selected, toggleGenre }) {
  return (
    <div>
      <label className="hover:cursor-pointer rounded-4xl">
        <input
          className="hidden"
          type="checkbox"
          checked={selected}
          onChange={() => toggleGenre(genre.id)}
        />
        <span
          className={clsx(
            "rounded-4xl text-sm px-4 py-2 flex justify-center font-script-bold items-center border-2 border-secondary-brand transition-all",
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
