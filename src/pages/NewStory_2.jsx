import BackButton from "../components/BackButton";
import Button from "../components/Button";
import toast from "react-hot-toast";
import ChapInput from "../components/ChapInput";
import ChapDropdown from "../components/ChapDropdown";
import { useState } from "react";
import { useAddChapterMutation } from "../services/apiService";
import { useNavigate, useParams } from "react-router-dom";

export default function NewStory_2({ stories }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addChapterMutation] = useAddChapterMutation();
  /* const currentUser = useSelector((state) => state.global.user); */

  const [newChapter, setNewChapter] = useState({
    id: "1",
    storyId: "1",
    title: "Capitolo 1",
    order: 1,
    content: "",
    created_at: new Date(),
    updated_at: null,
  });

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

    console.log(newChapter);
    if (!newChapter.content.trim()) {
      toast.error("Content cannot be empty.");
      return;
    }

    try {
      const response = await addChapterMutation(newChapter);
      if (response?.data?.id) {
        toast.success("Chapter created successfully!");

        navigate("URL-LIBRERIA");
      } else {
        toast.error("Failed to create chapter."); // qui gestisce l'errore relativo ad un id non esistente o non valido
      }
    } catch (error) {
      toast.error("An error occurred while creating the chapter.");
      console.error(error);
    }
  };

  function handleAddChapter() {}

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
      <ChapDropdown handleAddChapter={handleAddChapter} />
      {/* TEXT INPUT */}
      <ChapInput
        handleChange={handleChange}
        value={newChapter.content}
        name="content"
      />
    </form>
  );
}
