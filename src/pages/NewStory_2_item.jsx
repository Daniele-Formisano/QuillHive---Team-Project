import {
  useUpdateChapterMutation,
  useGetChaptersByStoryIdQuery,
} from "../services/apiService";
import toast from "react-hot-toast";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import ChapInput from "../components/ChapInput";
import BackButton from "../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";

export default function NewStory_2_item() {
  const navigate = useNavigate();
  const { storyId, chapterId } = useParams();
  const [updateChapterMutation] = useUpdateChapterMutation();
  const pageUrl = storyId ? `/stories/${storyId}/chapters` : "/library";

  const {
    data: chapters,
    isLoading,
    isError,
  } = useGetChaptersByStoryIdQuery(storyId);

  // Filtra i capitoli per ottenere solo quello con l'ID specifico
  const chapter = chapters?.find((chap) => chap.id === chapterId);

  const [chapterContent, setChapterContent] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Aggiorna lo stato con i dati del capitolo quando la risposta è ricevuta
  useEffect(() => {
    if (chapter) {
      setChapterContent(chapter.content);
    }
  }, [chapter]);

  const handleChange = (e) => {
    setChapterContent(e.target.value);
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chapterContent.trim()) {
      toast.error("Please write something! The chapter cannot be empty.");
      return;
    }

    try {
      await updateChapterMutation({ ...chapter, content: chapterContent });
      toast.dismiss();
      toast.success("Chapter updated successfully!");
      setHasUnsavedChanges(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update chapter.");
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <h2>Error loading chapter.</h2>;

  const handleBack = () => {
    if (hasUnsavedChanges) {
      const deleteToast = toast(
        <div>
          <p>You have unsaved changes. Do you want to save or discard them?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={async () => {
                try {
                  await updateChapterMutation({
                    ...chapter,
                    content: chapterContent,
                  });
                  toast.dismiss();
                  toast.success("Chapter saved successfully!");
                  setHasUnsavedChanges(false);

                  navigate(pageUrl);
                } catch (error) {
                  toast.dismiss();
                  toast.error("Failed to save chapter.");
                }
                toast.dismiss(deleteToast);
              }}
              className="bg-yellow-500 text-white p-2 pr-4 pl-4 rounded mt-4 mb-2"
            >
              Save and go back
            </button>
            <button
              onClick={() => {
                navigate(pageUrl);
                toast.dismiss(deleteToast);
              }}
              className="bg-gray-500 text-white p-2 pr-4 pl-4 rounded mt-4 mb-2"
            >
              Go back without saving
            </button>
          </div>
        </div>,
        {
          autoClose: false,
          closeButton: false,
        }
      );
    } else {
      navigate(pageUrl);
    }
  };

  return (
    <form className="ml-4 mr-4" onSubmit={handleSubmit}>
      <div className="flex justify-between mb-10 mt-3">
        {/* INDIETRO */}
        <BackButton onClick={handleBack} />
        {/* SAVE */}
        <div className="w-[110px]">
          <Button type="submit" isColorYellow={true}>
            Save
          </Button>
        </div>
      </div>

      {/* TARGHETTA CAPITOLO */}
      <div className="flex gap-2 justify-center font-script-semibold mb-2">
        <h2>CHAPTER</h2>
        <h2>{chapter?.order}</h2>
      </div>

      {/* TEXT INPUT */}
      <ChapInput
        handleChange={handleChange}
        value={chapterContent}
        name="content"
      />
    </form>
  );
}
