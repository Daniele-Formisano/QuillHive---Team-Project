import BackButton from "./BackButton";
import InputField from "./InputField";
import LoadCoverImg from "./LoadCoverImg";
import SelectGenres from "./SelectGenres";

export default function NewStory_1({ genres }) {
  return (
    // IL SUBMIT MANDA I NUOVI DATI AL DB
    <form onSubmit={() => {}}>
      <BackButton pageUrl="" /> {/* DEVI COLLEGARE IL PATH */}
      <LoadCoverImg />
      <InputField placeholder="Choose a title" />
      <InputField placeholder="Write a brief description of your story" />
      <SelectGenres genres={genres} />
      {/* BackButton */}
      {/* StartWritingButton */}
    </form>
  );
}
