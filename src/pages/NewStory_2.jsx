import BackButton from "../components/BackButton";
import Button from "../components/Button";
import toast from "react-hot-toast";
import ChapInput from "../components/ChapInput";
import ChapDropdown from "../components/ChapDropdown";
import { useState, useEffect } from "react";
import { useAddChapterMutation } from "../services/apiService";
import { useGetChaptersByStoryIdQuery } from "../services/apiService";
import { useUpdateChapterMutation } from "../services/apiService";
import { useNavigate, useParams } from "react-router-dom";

export default function NewStory_2({ stories }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addChapterMutation] = useAddChapterMutation();
  const [updateChapterMutation] = useUpdateChapterMutation();
  const {
    data: chapters,
    isLoading,
    isError,
  } = useGetChaptersByStoryIdQuery(id);
  /* const currentUser = useSelector((state) => state.global.user); */

  const [newChapter, setNewChapter] = useState({
    storyId: id,
    title: "Capitolo",
    order: 1,
    content: "",
    created_at: new Date(),
    updated_at: null,
  });

  // Gestiamo la selezione del capitolo
  const handleSelectChapter = (chapter) => {
    setNewChapter({
      ...chapter,
      content: chapter.content, // Assicurati che il contenuto del capitolo venga caricato nella textarea
    });
  };

  // Quando i capitoli vengono caricati, selezioniamo automaticamente il capitolo con order 1
  useEffect(() => {
    if (chapters && chapters.length > 0) {
      // Trova il capitolo con order 1
      const firstChapter = chapters.find((chapter) => chapter.order === 1);

      if (firstChapter) {
        handleSelectChapter(firstChapter); // Se lo trovi, selezionalo
      } else {
        // Se non ci sono capitoli, inizializza un nuovo capitolo
        setNewChapter({
          storyId: id,
          title: "Capitolo",
          order: 1,
          content: "",
          created_at: new Date(),
          updated_at: null,
        });
      }
    }
  }, [chapters]); // Si triggera ogni volta che i capitoli cambiano

  function handleChange(e) {
    const { name, value } = e.target;
    setNewChapter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // INVIO CAPITOLI CREATI AL DB
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se il contenuto è vuoto
    if (!newChapter.content.trim()) {
      toast.error("Content cannot be empty.");
      return;
    }

    // Se l'ID non esiste, significa che è un nuovo capitolo
    if (!newChapter.id) {
      try {
        // Creazione di un nuovo capitolo
        const response = await addChapterMutation(newChapter);
        if (response?.data?.id) {
          // Aggiorna lo stato con l'ID restituito dal server
          setNewChapter((prevState) => ({
            ...prevState,
            id: response.data.id, // Assegna l'ID ricevuto dal server
          }));

          toast.success("Chapter created successfully!");
          navigate("/libreria");
        } else {
          toast.error("Failed to create chapter.");
        }
      } catch (error) {
        toast.error("An error occurred while creating the chapter.");
        console.error(error);
      }
      return;
    }

    // Significa che il capitolo esiste già e deve essere aggiornato
    if (newChapter.id) {
      try {
        const response = await updateChapterMutation(newChapter);
        if (response?.data?.id) {
          toast.success("Chapter updated successfully!");
          navigate("/URL-LIBRERIA");
        } else {
          toast.error("Failed to update chapter.");
        }
      } catch (error) {
        toast.error("An error occurred while updating the chapter.");
        console.error(error);
      }
    }
  };

  function handleAddChapter() {
    setNewChapter({
      storyId: id,
      title: "Chapter",
      order: chapters.length + 1,
      content: "",
      created_at: new Date(),
      updated_at: null,
    });
  }

  return (
    <form className="ml-4 mr-4">
      {/* BOTTONI */}
      <div className="flex justify-between mb-6">
        {/* INDIETRO */}
        <BackButton pageUrl="/NewStory_1" />
        {/* SAVE */}
        <span className="w-[110px] h-[40]">
          <Button onClick={handleSubmit} type="submit" isColorYellow={true}>
            Save
          </Button>
        </span>
      </div>

      {/* CHAP DROPDOWN */}
      <ChapDropdown
        handleAddChapter={handleAddChapter}
        handleSelectChapter={handleSelectChapter}
        storyId={id}
      />
      {/* TEXT INPUT */}
      <ChapInput
        handleChange={handleChange}
        value={newChapter.content}
        name="content"
      />
    </form>
  );
}
