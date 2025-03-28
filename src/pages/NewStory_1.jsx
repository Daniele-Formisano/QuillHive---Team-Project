import { useState } from "react";
import BackButton from "../components/BackButton";
import InputField from "../components/InputField";
import LoadCoverImg from "../components/LoadCoverImg";
import SelectGenres from "../components/SelectGenres";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function NewStory_1({ genres }) {
  const navigate = useNavigate();
  // Stato per la selezione dei generi
  const [storyGenres, setStoryGenres] = useState([]);
  /*const {storyGenres} = useSelector((state) => state.storyGenres);
  const dispatch = useDispatch();*/

  // Funzione per gestire la selezione e deselezione dei generi
  const toggleGenre = (genre) => {
    setStoryGenres((prevSelected) => {
      // Se il genere è già selezionato, lo rimuoviamo, altrimenti lo aggiungiamo
      if (prevSelected.includes(genre)) {
        console.log(storyGenres);
        return prevSelected.filter((g) => g !== genre); // Rimuove il genere dalla selezione
      } else {
        console.log(storyGenres);
        return [...prevSelected, genre]; // Aggiunge il genere alla selezione
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  /* 
    setLoading(true);

    const newStory = {
      title: e.target.title.value,
      plot: e.target.description.value,
      usersId: 1, // ID dell'utente loggato
      cover_image: e.target.cover_image.value,
      status: e.target.status.value,
      likes: parseInt(e.target.likes.value), 
      languageId: 1, // ID della lingua scelta
    };

    try {
      const response = await addStory(newStory).unwrap();
      toast.success('Storia creata con successo!', { duration: 3000 });
    } catch (error) {
      toast.error(''Errore durante la creazione della storia', { duration: 3000 });
    }
      finally {
      setLoading(false);
    }
  };

    // Chiama la mutazione per aggiungere la storia
    addStory(newStory);
  }; */

  return (
    // IL SUBMIT MANDA I NUOVI DATI AL DB
    <form
      className="pr-8 pl-8 pt-3 pb-3 gap-5 flex flex-col"
      onSubmit={handleSubmit}
    >
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
        type="textarea"
        id="description"
        label="Description"
        onChange="" /* devo aggiornare il plot di storia */
      />
      <SelectGenres
        selectTitle="Add genres"
        paragraph="Select your creative role-choose at least 1 option, up to 5, or just continue as a reader"
        dataSelect={genres}
        placeholder="Select genres"
        arraySelectedItems={storyGenres}
        toggleItems={toggleGenre}
      />
      <div className="flex flex-col gap-5 mt-30">
        <Button
          onClick={() => {
            navigate("/NewStory_2");
          }}
          type="submit"
          isColorYellow={true}
        >
          Start Writing
        </Button>
        <Button
          onClick={() => {
            navigate("url");
          }}
        >
          Back
        </Button>
      </div>
    </form>
  );
}
