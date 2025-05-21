import { useNavigate, useParams } from "react-router-dom";
import {
  useGetChaptersByStoryIdQuery,
  useAddUserStoriesMutation,
  useLazyGetUserStoryQuery,
} from "../services/apiService";
import Loader from "../components/Loader";
import BackButton from "../components/BackButton";
import SwitchChapters from "../components/SwitchChapters";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import HamburgerForChapters from "../components/HamburgerForChapters";

export default function ReadingPage() {
  const { storyId, chapterOrder } = useParams();
  const story = useSelector((state) =>
    state.global.stories.find((story) => story.id == storyId)
  );

  const user = useSelector((state) => state.global.user);

  const {
    data: chaptersOfStory,
    isLoading,
    error,
  } = useGetChaptersByStoryIdQuery(storyId);

  const [addUserStories] = useAddUserStoriesMutation();
  const [triggerUserStory] = useLazyGetUserStoryQuery();

  const [chapters, setChapters] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (chaptersOfStory) {
      const orderedChapters = [...chaptersOfStory.chapters].sort(
        (a, b) => a.order - b.order
      );
      setChapters(orderedChapters);
    }
  }, [chaptersOfStory]);

  function nextChapter() {
    navigate(
      `/story/${storyId}/read-story/chapter/${Number(chapterOrder) + 1}`
    );
  }

  function prevChapter() {
    navigate(
      `/story/${storyId}/read-story/chapter/${Number(chapterOrder) - 1}`
    );
  }

  // funzione per settare lo status della storia a completed e ritornare alla pagina della storia
  async function handleClick() {
    try {
      const response = await triggerUserStory({
        userId: user.id,
        storyId: storyId,
      }).unwrap();

      const { userStory } = response;

      await addUserStories({
        userId: user.id,
        storyId: storyId,
        status: "completed",
        saved: userStory[0].user_saved,
      });

      navigate(`/story/${storyId}/info`);
    } catch (error) {
      toast.error(error);
    }
  }

  if (error) return <div>Error: {error}</div>;
  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (chaptersOfStory && chapters) {
    return (
      <div className="bg-bg-brand min-h-screen pt-2">
        <header className="flex flex-col gap-10">
          <div className="flex flex-wrap justify-between items-center pr-2">
            <BackButton pageURL={`/story/${storyId}/info`} />
            <h2 className="text-xl font-script-semibold  text-secondary-brand">
              {story.title}
            </h2>
            <HamburgerForChapters chapters={chapters} />
          </div>
        </header>

        <main>
          <div className="p-5 flex flex-col gap-10">
            <div className="flex flex-col gap-7 pb-24">
              <h1 className="text-center font-script-semibold text-secondary-brand text-2xl">
                {chapters[chapterOrder - 1].title}
              </h1>

              <p>{chapters[chapterOrder - 1].content}</p>

              {Number(chapters[chapterOrder - 1].chapter_order) ===
                chapters.length && (
                <Button
                  isColorYellow={true}
                  textSize={"text-base"}
                  onClick={handleClick}
                >
                  I completed reading this story
                </Button>
              )}
            </div>

            <div className="fixed bottom-0 pb-3 pt-3 left-0 w-full bg-bg-brand">
              <SwitchChapters
                chapter={chapters[chapterOrder - 1]}
                chapterLength={chapters.length}
                onClickNext={nextChapter}
                onClickBack={prevChapter}
              />
            </div>
          </div>
        </main>
      </div>
    );
  }
}
