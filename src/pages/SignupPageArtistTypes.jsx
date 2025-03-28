import ArtistTypeItem from "../components/ArtistTypeItem";

export default function SignupPageArtistTypes({ artistTypes }) {
  return (
    <div className="flex flex-col gap-10 p-8 min-h-screen bg-bg-brand justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="font-title text-3xl text-secondary-brand">
          Wich artist hides within you?
        </h1>

        <h3 className="font-script text-sm text-secondary-brand">
          Select your creative role—choose at least 1, up to 2, or just continue
          as a reader.
        </h3>
      </div>

      <ArtistTypeItem />
    </div>
  );
}
