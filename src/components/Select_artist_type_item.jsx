import clsx from "clsx";

export default function Select_artist_type_item({
  type,
  selected,
  toggleArtistType,
}) {
  const handleClick = () => {
    toggleArtistType(type.id);
  };

  return (
    <label
      className="group flex items-center m-6 cursor-pointer rounded-full relative "
      onClick={handleClick}
    >
      <input
        type="checkbox"
        value={type.name.toLowerCase()}
        name="artist_type"
        id={type.name.toLowerCase()}
        checked={selected}
        onChange={handleClick}
        className="opacity-0 absolute"
      />

      <img
        src={`svg${type.name}.svg`}
        className="absolute group-hover:scale-115 duration-150 flex justify-center items-center z-20 transform -translate-x-5"
      />

      <span
        className={clsx(
          "flex font-script justify-center items-center font-medium border-3 rounded-full border-secondary-brand w-[230px] h-[33px] relative z-10",
          selected
            ? "bg-secondary-brand text-primary-brand"
            : " text-secondary-brand "
        )}
      >
        {type.name}
      </span>
    </label>
  );
}
