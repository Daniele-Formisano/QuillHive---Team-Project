import { useState } from "react";
import BackButton from "./BackButton";
import InputField from "./InputField";
import LoadCoverImg from "./LoadCoverImg";
import SelectGenres from "./SelectGenres";

export default function NewStory_1({ genres }) {
  // Stato per la selezione dei generi
  const [selectedGenres, setSelectedGenres] = useState([]);

  // Funzione per gestire la selezione e deselezione dei generi
  const toggleGenre = (genre) => {
    setSelectedGenres((prevSelected) => {
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
        value=""
        onChange=""
      />
      <InputField
        placeholder="Write a brief description of your story"
        type="text"
        id="description"
        label="Description"
        value=""
        onChange=""
      />
      <SelectGenres
        genres={genres}
        selectedGenres={selectedGenres}
        toggleGenre={toggleGenre}
      />
      {/* BackButton */}
      {/* StartWritingButton */}
    </form>
  );
}
