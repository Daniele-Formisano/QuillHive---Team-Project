import Select_artist_type_item from "./Select_artist_type_item";

export default function Select_artist_type({
  artistTypes,
  selected,
  toggleArtistType,
}) {
  return (
    <fieldset className="flex flex-col items-center">
      {artistTypes.map((type) => (
        <Select_artist_type_item
          key={type.id}
          type={type}
          selected={selected.includes(type.id)}
          toggleArtistType={toggleArtistType}
        />
      ))}
    </fieldset>
  );
}
