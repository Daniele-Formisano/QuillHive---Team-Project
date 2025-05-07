import ArtistTypeItem from "./ArtistTypeItem";

export default function ArtistTypesList({
  artistTypes,
  selected,
  toggleArtistType,
}) {
  return (
    <div className="flex flex-col gap-10">
      {artistTypes.map((artistType) => (
        <ArtistTypeItem
          key={artistType.id}
          artistType={artistType}
          selected={selected.includes(artistType.id)}
          toggleArtistType={toggleArtistType}
        />
      ))}
    </div>
  );
}
