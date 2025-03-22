import BackButton from "./BackButton";
import LoadCoverImg from "./LoadCoverImg";
import SelectGenres from "./SelectGenres";

export default function NewStory_1({ genres }) {
  return (
    // IL SUBMIT MANDA I NUOVI DATI AL DB
    <form onSubmit={() => {}}>
      <BackButton pageUrl="" /> {/* DEVI COLLEGARE IL PATH */}
      <LoadCoverImg />
      {/* InputField */}
      {/* InputField */}
      <SelectGenres genres={genres} />
      {/* BackButton */}
      {/* StartWritingButton */}
    </form>
  );
}
