export default function ArtistTypeItem({
  artistType,
  selected,
  toggleArtistType,
}) {
  return (
    <div>
      <label htmlFor={artistType.id}>
        <input
          type="checkbox"
          checked={selected}
          id={artistType.id}
          className="hidden"
        />

        <span></span>
      </label>
    </div>
  );
}
