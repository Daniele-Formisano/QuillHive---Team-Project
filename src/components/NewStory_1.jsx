import BackButton from "./BackButton";
import SelectGenres from "./SelectGenres";

export default function NewStory_1() {
  return (
    // IL SUBMIT MANDA I NUOVI DATI AL DB
    <form onSubmit={() => {}}>
      <BackButton pageUrl="" />; {/* DEVI COLLEGARE IL PATH */}
      {/* LoadImage */}
      {/* InputField */}
      {/* InputField */}
      <SelectGenres />
      {/* BackButton */}
      {/* StartWritingButton */}
    </form>
  );
}
