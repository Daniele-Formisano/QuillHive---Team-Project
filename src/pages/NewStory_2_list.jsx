import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
import { IconPencil } from "@tabler/icons-react";
import {
  useDeleteChapterMutation,
  useGetChaptersByStoryIdQuery,
} from "../services/apiService";
import { IconTrash } from "@tabler/icons-react";
import { useAddChapterMutation } from "../services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export default function NewStory_2_list() {
  const navigate = useNavigate();
  const { storyId } = useParams();
  const {
    data: chapters,
    isLoading,
    isError,
    refetch,
  } = useGetChaptersByStoryIdQuery(storyId);
  const [addChapterMutation] = useAddChapterMutation();
  const [deleteChapterMutation] = useDeleteChapterMutation();

  const [newChapter, setNewChapter] = useState({
    storyId: storyId,
    title: "Capitolo",
    order: 1,
    content: "",
    created_at: new Date(),
    updated_at: null,
  });

  async function handleAddChapter() {
    const chapterToCreate = {
      storyId: storyId,
      title: "Chapter",
      order: chapters?.length + 1 || 1,
      content: "",
      created_at: new Date(),
      updated_at: null,
    };

    try {
      const createdChapter = await addChapterMutation(chapterToCreate).unwrap();

      if (createdChapter?.id) {
        setNewChapter({
          ...chapterToCreate,
          id: createdChapter.id,
        });

        toast.success("Chapter created successfully!");
        refetch();
      } else {
        toast.error("Failed to create chapter.");
      }
    } catch (error) {
      toast.error("An error occurred while creating the chapter.");
      console.error(error);
    }
  }

  async function handleDeleteChap(chapterId) {
    // Mostra un toast interattivo con un pulsante di conferma e annullamento
    const deleteToast = toast(
      <div>
        <p>Are you sure you want to delete this chapter?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={async () => {
              try {
                // Se confermiamo, eseguiamo la cancellazione
                await deleteChapterMutation({ id: chapterId }).unwrap();
                toast.success("Chapter deleted successfully!");
                refetch();
              } catch (error) {
                toast.error("Failed to delete chapter.");
                console.error(error);
              }
              toast.dismiss(deleteToast); // Chiude il toast
            }}
            className="bg-red-500 text-white p-2 pr-4 pl-4 rounded mt-4 mb-2"
          >
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(deleteToast)} // Annulla l'azione
            className="bg-gray-500 text-white p-2 pr-4 pl-4 rounded mt-4 mb-2"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false, // Non si chiude automaticamente
        closeButton: false, // Disabilita il pulsante di chiusura predefinito
      }
    );
  }

  function handleModifyChap(chapterId) {
    navigate(`/stories/${storyId}/chapters/${chapterId}`);
  }

  return (
    <div>
      {/* INDIETRO */}
      <span className="flex justify-between items-center m-2 mb-6">
        <BackButton pageUrl="/library" />
      </span>
      {/* CHAPTER LIST */}
      <div>
        {isLoading && <Loader />}
        {isError && <h2>Error loading chapters.</h2>}
        {chapters && chapters.length > 0 && (
          <ul className="font-script flex flex-col mr-3 ml-3 gap-1 text-sm text-secondary-brand">
            {chapters
              .filter((chapter) => chapter.id != null)
              .map((chapter) => (
                <li
                  key={chapter.id}
                  className="flex justify-between p-3 rounded-lg border-2 border-stroke-brand cursor-pointer hover:bg-gray-100"
                >
                  <span className="font-script flex gap-2">
                    <h2>{chapter.title}</h2>
                    <h2>{chapter.order}</h2>
                  </span>

                  <span className="flex gap-2.5">
                    <IconPencil stroke={2} onClick={handleModifyChap} />
                    <IconTrash
                      stroke={2}
                      onClick={() => handleDeleteChap(chapter.id)}
                    />
                  </span>
                </li>
              ))}
          </ul>
        )}
        <div className="mt-10 mb-10 mr-15 ml-15 px-4 py-1 bg-primary-brand rounded-lg text-secondary-brand font-script-semibold text-center cursor-pointer">
          <button type="button" onClick={handleAddChapter}>
            Add a new chapter
          </button>
        </div>
      </div>
    </div>
  );
}
