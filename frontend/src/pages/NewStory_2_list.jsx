import {
  useDeleteChapterMutation,
  useGetChaptersByStoryIdQuery,
} from "../services/apiService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { IconTrash } from "@tabler/icons-react";
import { IconPencil } from "@tabler/icons-react";
import BackButton from "../components/BackButton";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAddChapterMutation } from "../services/apiService";
import Button from "../components/Button";

export default function NewStory_2_list() {
  const navigate = useNavigate();
  const location = useLocation();
  const { storyId } = useParams();
  const {
    data: chaptersData,
    isLoading,
    isError,
    refetch,
  } = useGetChaptersByStoryIdQuery(storyId);
  const [addChapterMutation] = useAddChapterMutation();
  const [deleteChapterMutation] = useDeleteChapterMutation();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [customOrder, setCustomOrder] = useState("");

  const chapters = chaptersData?.chapters;

  const [newChapter, setNewChapter] = useState({
    story_id: storyId,
    title: "Capitolo",
    chapter_order: 1,
    content: "",
    created_at: new Date(),
    updated_at: null,
  });

  useEffect(() => {
    if (location.state?.refetch) {
      refetch();
    }
  }, [location.state, refetch]);
  console.log(chapters);

  async function handleAddChapter() {
    const parsedOrder = parseInt(customOrder, 10);

    if (isNaN(parsedOrder) || parsedOrder < 1) {
      toast.error("Please enter a valid chapter order (number ≥ 1).");
      return;
    }

    const orderExists = chapters?.some(
      (chap) => chap.chapter_order === parsedOrder
    );

    if (orderExists) {
      toast.error("A chapter with this order already exists.");
      return;
    }

    const chapterToCreate = {
      story_id: storyId,
      title: "Chapter",
      chapter_order: parsedOrder,
      content: "",
      created_at: new Date(),
      updated_at: null,
    };

    try {
      const createdChapter = await addChapterMutation(chapterToCreate).unwrap();

      if (createdChapter.chapter[0].id) {
        setNewChapter({
          ...chapterToCreate,
          id: createdChapter.chapter[0].id,
        });

        toast.success("Chapter created successfully!");

        setShowCreateForm(false);
        setCustomOrder("");
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
              toast.dismiss(deleteToast);
            }}
            className="bg-red-500 text-white p-2 pr-4 pl-4 rounded mt-4 mb-2">
            Confirm
          </button>
          <button
            onClick={() => toast.dismiss(deleteToast)}
            className="bg-gray-500 text-white p-2 pr-4 pl-4 rounded mt-4 mb-2">
            Cancel
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
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
        <BackButton pageURL={"/home"} />
      </span>
      {/* CHAPTER LIST */}
      <div>
        {isLoading && <Loader />}
        {isError && <h2>Error loading chapters.</h2>}
        {chapters && chapters.length > 0 && (
          <ul className="font-script flex flex-col mr-3 ml-3 gap-1 text-sm text-secondary-brand">
            {chapters
              .filter((chapter) => chapter.id != null)
              .sort((a, b) => a.chapter_order - b.chapter_order)
              .map((chapter) => (
                <li
                  key={chapter.id}
                  className="flex justify-between p-3 rounded-lg border-2 border-stroke-brand cursor-pointer hover:bg-gray-100"
                >
                  <span className="font-script flex gap-3">
                    <h2>{chapter.chapter_order}.</h2>
                    <h2>{chapter.title}</h2>
                  </span>

                  <span className="flex gap-2.5">
                    <IconPencil
                      stroke={2}
                      onClick={() => handleModifyChap(chapter.id)}
                    />
                    <IconTrash
                      stroke={2}
                      onClick={() => handleDeleteChap(chapter.id)}
                    />
                  </span>
                </li>
              ))}
          </ul>
        )}
        {showCreateForm ? (
          <div className="mt-8 flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder="Chapter number"
              className="border border-gray-300 rounded-[50px] px-3 py-1 w-48 text-center focus:outline-none focus:ring-primary-brand focus:border-primary-brand transition-all text-input-text-brand placeholder:text-gray-500"
              value={customOrder}
              onChange={(e) => {
                const value = e.target.value;

                // Permette solo cifre
                if (/^\d*$/.test(value)) {
                  setCustomOrder(value);
                } else {
                  toast.error("Only numbers are allowed.");
                }
              }}
              min="1"
            />

            <div className="flex gap-4">
              <Button onClick={handleAddChapter} isColorYellow={true}>
                Create
              </Button>
              
              <Button
                onClick={() => {
                  setShowCreateForm(false);
                  setCustomOrder("");
                }}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-10 mb-10 mr-15 ml-15 font-script-semibold text-center cursor-pointer">
            <Button
              onClick={() => setShowCreateForm(true)}
              children={"Create a new chapter"}
              isColorYellow={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
