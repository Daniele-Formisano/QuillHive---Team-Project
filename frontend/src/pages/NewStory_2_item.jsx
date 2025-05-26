import {
  useUpdateChapterMutation,
  useGetChaptersByStoryIdQuery,
} from "../services/apiService";
import toast from "react-hot-toast";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import ChapInput from "../components/ChapInput";
import { IconPencil } from "@tabler/icons-react";
import BackButton from "../components/BackButton";
import { useParams, useNavigate } from "react-router-dom";

export default function NewStory_2_item() {
  const navigate = useNavigate();
  const { storyId, chapterId } = useParams();
  const [updateChapterMutation] = useUpdateChapterMutation();
  const pageUrl = storyId ? `/stories/${storyId}/chapters` : "/library";

  const {
    data: chaptersData,
    isLoading,
    isError,
  } = useGetChaptersByStoryIdQuery(storyId);

  const chapters = chaptersData?.chapters;

  const chapter = chapters?.find(
    (chap) => String(chap.id) === String(chapterId)
  );
  const [chapterContent, setChapterContent] = useState(chapter?.content);
  const [chapterTitle, setChapterTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (chapter) {
      setChapterContent(chapter.content);
      setChapterTitle(chapter.title || "Chapter");
    }
  }, [chapter, chaptersData]);

  const handleChange = (newMarkdown) => {
    setChapterContent(newMarkdown);
    setHasUnsavedChanges(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chapterContent.trim()) {
      toast.error("Please write something! The chapter cannot be empty.");
      return;
    }

    try {
      await updateChapterMutation({
        ...chapter,
        content: chapterContent,
        title: chapterTitle,
      });
      toast.dismiss();
      toast.success("Chapter updated successfully!");
      setChapterContent(chapterContent);
      setHasUnsavedChanges(false);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to update chapter.");
    }
  };

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
                    title: chapterTitle,
                  });
                  toast.success("Chapter saved successfully!");
                  setHasUnsavedChanges(false);
                  navigate(pageUrl);
                } catch (error) {
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
                navigate(pageUrl, { state: { refetch: true } });
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
      navigate(pageUrl, { state: { refetch: true } });
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <h2>Error loading chapter.</h2>;

  return (
    <form className="ml-4 mr-4" onSubmit={handleSubmit}>
      <div className="flex justify-between mb-10 mt-3">
        <BackButton onClick={handleBack} />
        <div className="w-[110px]">
          <Button type="submit" isColorYellow={true}>
            Save
          </Button>
        </div>
      </div>

      {/* TITOLO CAPITOLO EDITABILE */}
      <div className="flex gap-2 justify-center font-script-semibold mb-4 items-center">
        {isEditingTitle ? (
          <input
            type="text"
            value={chapterTitle}
            onChange={(e) => {
              setChapterTitle(e.target.value);
              setHasUnsavedChanges(true);
            }}
            onBlur={() => setIsEditingTitle(false)}
            className="text-xl text-center border-b border-gray-400 focus:outline-none"
            autoFocus
          />
        ) : (
          <>
            <h2 className="text-xl">{chapterTitle}</h2>
            <IconPencil
              stroke={2}
              className="cursor-pointer"
              onClick={() => setIsEditingTitle(true)}
            />
          </>
        )}
      </div>

      {/* TEXT AREA CAPITOLO */}
      <ChapInput
        handleChange={(md) => {
          setChapterContent(md);
          setHasUnsavedChanges(true);
        }}
        value={chapterContent}
      />
    </form>
  );
}
