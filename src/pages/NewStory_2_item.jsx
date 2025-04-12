import BackButton from "../components/BackButton";
import Button from "../components/Button";
import toast from "react-hot-toast";
import ChapInput from "../components/ChapInput";
import { useEffect } from "react";
import {
  useGetChaptersByChapterIdQuery,
  useUpdateChapterMutation,
} from "../services/apiService";
import { useParams } from "react-router-dom";

export default function NewStory_2_item() {
  const { storyId, chapId } = useParams();
  const [updateChapterMutation] = useUpdateChapterMutation();
  const {
    data: chapter,
    isLoading,
    isError,
  } = useGetChaptersByChapterIdQuery(chapId);

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
          storyId: storyId,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica se il contenuto è vuoto
    if (!newChapter.content.trim()) {
      toast.error("Content cannot be empty.");
      return;
    }

    // Significa che il capitolo esiste già e deve essere aggiornato
    if (newChapter.id) {
      try {
        const response = await updateChapterMutation(newChapter);
        if (response?.data?.id) {
          toast.success("Chapter updated successfully!");
        } else {
          toast.error("Failed to update chapter.");
        }
      } catch (error) {
        toast.error("An error occurred while updating the chapter.");
        console.error(error);
      }
    }
  };

  return (
    <form className="ml-4 mr-4">
      <div className="flex justify-between mb-6">
        {/* INDIETRO */}
        <BackButton pageUrl="/stories/:story_id/chapters" />
        {/* SAVE */}
        <span className="w-[110px] h-[40]">
          <Button onClick={handleSubmit} type="submit" isColorYellow={true}>
            Save
          </Button>
        </span>
      </div>

      {/* TARGHETTA CAPITOLO */}
      <div>
        <h2 className="font-script">Chapter</h2>
      </div>

      {/* TEXT INPUT */}
      <ChapInput
        handleChange={handleChange}
        value={newChapter.content}
        name="content"
      />
    </form>
  );
}
