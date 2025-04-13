import { useNavigate, useParams } from "react-router-dom";
import { useGetChaptersByStoryIdQuery } from "../services/apiService";
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

  const {
    data: chaptersOfStory,
    isLoading,
    error,
  } = useGetChaptersByStoryIdQuery(storyId);

  const [chapters, setChapters] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (chaptersOfStory) {
      const orderedChapters = [...chaptersOfStory].sort(
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
          <div className="flex flex-wrap justify-between items-center">
            <BackButton pageURL={`/story/${storyId}/info`} />
            <h2 className="text-xl font-script-semibold  text-secondary-brand">
              {story.title}
            </h2>
            <HamburgerForChapters chapters={chapters} />
          </div>
          <div>
            <SwitchChapters
              chapter={chapters[chapterOrder - 1]}
              chapterLength={chapters.length}
              onClickNext={nextChapter}
              onClickBack={prevChapter}
            />
          </div>
        </header>

        <main>
          <div className="p-5 flex flex-col gap-10">
            <p>{chapters[chapterOrder - 1].content}</p>

            {Number(chapters[chapterOrder - 1].order) === chapters.length && (
              <Button
                isColorYellow={true}
                textSize={"text-base"}
                onClick={() => navigate(`/story/${storyId}/info`)}
              >
                I completed reading this story
              </Button>
            )}
          </div>
        </main>
      </div>
    );
  }
}
