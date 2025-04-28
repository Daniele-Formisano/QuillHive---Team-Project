import GenrePreference from "./GenrePreference";

export default function GenreList({ list, selected, toggleGenre }) {
  return (
    <div className="flex flex-wrap gap-x-2.5 gap-y-2">
      {list.map((genre) => (
        <GenrePreference
          key={genre.id}
          genre={genre}
          selected={selected.includes(genre.id)}
          toggleGenre={toggleGenre}
        />
      ))}
    </div>
  );
}
