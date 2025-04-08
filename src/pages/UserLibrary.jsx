import { useEffect, useState } from "react";
import FilterButton from "../components/FilterButtons";
import {
  useGetUserStoriesQuery,
  useLazyGetStoriesQuery,
} from "../services/apiService";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Navbar from "../components/navbar";

export default function UserLibrary() {
  const [filterButton, setFilterButton] = useState([
    { text: "Reading Now", active: true },
    { text: "My Creations", active: false },
    { text: "Favorites", active: false },
  ]);
  const [stories, setStories] = useState([]);
  const [storiesOfUsers, setStoriesOfUsers] = useState([]);
  const { id } = useSelector((state) => state.global.user);

  const { data: userStories, isLoanding, error } = useGetUserStoriesQuery(id);

  const [triggerGetStories] = useLazyGetStoriesQuery();

  async function storiesData() {
    const storiesArray = [];

    for (const story of userStories) {
      // imposta i libri salvati o attualmente in lettura nell'array stories
      const [dataStory] = await triggerGetStories({
        storyId: story.storyId,
      }).unwrap();

      storiesArray.push(dataStory);
    }

    setStories(storiesArray);

    // imposta i libri dell'utente nell'array storiesOfUsers
    const dataStoriesOfUser = await triggerGetStories({ userId: id }).unwrap();

    setStoriesOfUsers(dataStoriesOfUser);
  }

  useEffect(() => {
    if (userStories) {
      storiesData();
    }
  }, [userStories]);

  function handleClick(selectedText) {
    const activeFilter = filterButton.map((filter) =>
      filter.text === selectedText
        ? { ...filter, active: true }
        : { ...filter, active: false }
    );

    setFilterButton(activeFilter);
  }

  if (isLoanding) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (userStories && storiesOfUsers) {
    return (
      <div className="bg-bg-brand min-h-screen p-2 flex flex-col gap-4">
        <div>
          <FilterButton optionsFilter={filterButton} onClick={handleClick} />
        </div>

        {/* Se viene selezionato Reading Now */}
        {filterButton[0].active && (
          <div>
            {stories.length &&
            userStories.filter((story) => story.status === "reading").length ? (
              <main className="grid grid-cols-2">
                {userStories
                  .filter((story) => story.status === "reading")
                  .map((storyFiltered) => (
                    <Card
                      key={storyFiltered.id}
                      story={stories.find(
                        (story) => story.id === storyFiltered.storyId
                      )}
                    />
                  ))}
              </main>
            ) : (
              <main className="inline-flex justify-center mt-7 w-full">
                <p className="text-center font-script-semibold text-secondary-brand/80 text-xl">
                  Nothing here… time to read! ​🐝​
                </p>
              </main>
            )}
          </div>
        )}

        {/* Se viene selezionato My Creations*/}
        {filterButton[1].active && (
          <main>
            {storiesOfUsers.length ? (
              <main className="grid grid-cols-2">
                {storiesOfUsers.map((story) => (
                  <Card key={story.id} story={story} />
                ))}
              </main>
            ) : (
              <main className="inline-flex justify-center mt-7 w-full">
                <p className="text-center font-script-semibold text-secondary-brand/80 text-xl">
                  No story created yet 😞​
                </p>
              </main>
            )}
          </main>
        )}

        {filterButton[2].active && (
          <div>
            {stories.length &&
            userStories.filter((story) => story.saved === true).length ? (
              <div className="grid grid-cols-2">
                {userStories
                  .filter((story) => story.saved === true)
                  .map((storyFiltered) => (
                    <Card
                      key={storyFiltered.id}
                      story={stories.find(
                        (story) => story.id === storyFiltered.storyId
                      )}
                    />
                  ))}
              </div>
            ) : (
              <main className="inline-flex justify-center mt-7 w-full">
                <p className="text-center font-script-semibold text-secondary-brand/80 text-xl">
                  No stories added to favorites ​💔​
                </p>
              </main>
            )}
          </div>
        )}
        <div className=" flex justify-center items-center w-full fixed font-title bottom-2">
          <Navbar />
        </div>
      </div>
    );
  }
}
