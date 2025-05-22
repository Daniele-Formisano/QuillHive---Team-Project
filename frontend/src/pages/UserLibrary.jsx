import { useEffect, useState } from "react";
import FilterButton from "../components/FilterButtons";
import {
  useGetUserStoriesQuery,
  useGetUserProjectsQuery,
} from "../services/apiService";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
//import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import HeaderNavbar from "../components/HeaderNavbar";

export default function UserLibrary() {
  const [filterButton, setFilterButton] = useState([
    { text: "Reading Now", active: true },
    { text: "My Creations", active: false },
    { text: "Saved", active: false },
  ]);
  const [stories, setStories] = useState([]);
  const [storiesOfUserArray, setStoriesOfUserArray] = useState([]);
  const user = useSelector((state) => state.global.user);

  // per ottenere tutte le storie salvate o inizate a leggere dall'user
  const {
    data: userStories,
    isLoanding: loadingUserStories,
    error: errorUserStories,
  } = useGetUserStoriesQuery(user.id);

  // per ottenere tute le storie create dall'user
  const {
    data: storiesOfUser,
    isLoading: loadingStoriesOfUser,
    error: errorStoriesOfUser,
  } = useGetUserProjectsQuery(user.id);

  //const navigate = useNavigate();

  useEffect(() => {
    if (!loadingUserStories && userStories) {
      const { userStories: stories } = userStories;
      setStories(stories);
    }
  }, [loadingUserStories, userStories]);

  useEffect(() => {
    if (!loadingStoriesOfUser && storiesOfUser) {
      const { stories } = storiesOfUser;
      setStoriesOfUserArray(stories);
    }
  }, [loadingStoriesOfUser, storiesOfUser]);

  function handleClick(selectedText) {
    const activeFilter = filterButton.map((filter) =>
      filter.text === selectedText
        ? { ...filter, active: true }
        : { ...filter, active: false }
    );

    setFilterButton(activeFilter);
  }

  if (loadingUserStories || loadingStoriesOfUser)
    return (
      <div>
        <Loader />
      </div>
    );

  if (errorStoriesOfUser || errorUserStories)
    return <div>Error: {errorStoriesOfUser || errorUserStories}</div>;

  if (userStories && storiesOfUser) {
    return (
      <div className="bg-bg-brand min-h-screen flex flex-col">
        <HeaderNavbar user={user} />
        <div className="pl-2 pr-2 mt-18 ">
          <FilterButton optionsFilter={filterButton} onClick={handleClick} />
        </div>

        <div className="flex flex-col grow justify-between ">
          {/* Se viene selezionato Reading Now */}
          {filterButton[0].active && (
            <div>
              {stories.filter((story) => story.status === "reading").length ? (
                <main className="grid grid-cols-2 mb-14">
                  {stories
                    .filter((story) => story.status === "reading")
                    .map((storyFiltered) => (
                      <Card key={storyFiltered.id} story={storyFiltered} />
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
            <div>
              {storiesOfUserArray.length ? (
                <main className="grid grid-cols-2 mb-14">
                  {storiesOfUserArray.map((story) => (
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
            </div>
          )}

          {/* Se viene selezionato Saved*/}
          {filterButton[2].active && (
            <div>
              {stories.filter((story) => story.user_saved == true).length ? (
                <main className="grid grid-cols-2 mb-14 ">
                  {stories
                    .filter((story) => story.user_saved == true)
                    .map((storyFiltered) => (
                      <Card key={storyFiltered.id} story={storyFiltered} />
                    ))}
                </main>
              ) : (
                <main className="inline-flex justify-center mt-7 w-full">
                  <p className="text-center font-script-semibold text-secondary-brand/80 text-xl">
                    No stories added to favorites ​💔​
                  </p>
                </main>
              )}
            </div>
          )}

          <div className="font-title fixed bottom-0 w-full flex justify-center items-center z-30">
            <Navbar isLibrary={true} user={user.id} />
          </div>
        </div>
      </div>
    );
  }
}
