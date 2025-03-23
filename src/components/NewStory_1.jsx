import { useState } from "react";
import BackButton from "./BackButton";
import InputField from "./InputField";
import LoadCoverImg from "./LoadCoverImg";
import SelectGenres from "./SelectGenres";
import Button from "./Button";

export default function NewStory_1({ genres }) {
  // Stato per la selezione dei generi
  const [storyGenres, setStoryGenres] = useState([]);

  // Funzione per gestire la selezione e deselezione dei generi
  const toggleGenre = (genre) => {
    setStoryGenres((prevSelected) => {
      // Se il genere è già selezionato, lo rimuoviamo, altrimenti lo aggiungiamo
      if (prevSelected.includes(genre)) {
        return prevSelected.filter((g) => g !== genre); // Rimuove il genere dalla selezione
      } else {
        return [...prevSelected, genre]; // Aggiunge il genere alla selezione
      }
    });
  };

  return (
    // IL SUBMIT MANDA I NUOVI DATI AL DB
    <form className="mr-11 ml-11 flex flex-col gap-5" onSubmit={() => {}}>
      <BackButton pageUrl="" /> {/* DEVI COLLEGARE IL PATH */}
      <LoadCoverImg />
      <InputField
        placeholder="Choose a title"
        type="text"
        id="title"
        label="Title"
        onChange="" /* devo aggiornare il title di storia */
      />
      <InputField
        placeholder="Write a brief description of your story"
        type="text"
        id="description"
        label="Description"
        onChange="" /* devo aggiornare il plot di storia */
      />
      <SelectGenres
        genres={genres}
        storyGenres={storyGenres}
        toggleGenre={toggleGenre}
      />
      <Button
        onClick=""
        children="Start Writing"
        type="submit"
        isColorYellow={true}
      />
      <Button
        onClick={() => {
          navigate("url");
        }} // inserisci un url
        children="Back"
        type="button"
        isColorYellow={false}
      />
    </form>
  );
}
