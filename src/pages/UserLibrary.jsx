import { useEffect, useState } from "react";
import FilterButton from "../components/FilterButtons";
import {
  useGetUserStoriesQuery,
  useLazyGetStoriesQuery,
} from "../services/apiService";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import Navbar from "../components/navbar";
import ProfileIcon from "../components/ProfileIcon";
import Searchbar from "../components/Searchbar";
import HamburgerMenu from "../components/HamburgherMenu";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

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

  const navigate = useNavigate();

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

  const handleProfileClick = () => {
    navigate("/editProfile");
  };

  if (isLoanding)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  if (userStories && storiesOfUsers) {
    return (
      <div className="bg-bg-brand min-h-screen flex flex-col">
        <header className="flex flex-row gap-2  justify-around items-center bg-bg-brand z-45">
          <HamburgerMenu />

          <Searchbar />
          <div>
            <ProfileIcon width={50} height={50} onClick={handleProfileClick} />
          </div>
        </header>
        <div className="pl-2 pr-2 mt-5">
          <FilterButton optionsFilter={filterButton} onClick={handleClick} />
        </div>

        <div className="flex flex-col grow justify-between">
          {/* Se viene selezionato Reading Now */}
          {filterButton[0].active && (
            <div>
              {stories.length &&
              userStories.filter((story) => story.status === "reading")
                .length ? (
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
            <div>
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
            </div>
          )}

          {/* Se viene selezionato */}
          {filterButton[2].active && (
            <div>
              {stories.length &&
              userStories.filter((story) => story.saved === true).length ? (
                <main className="grid grid-cols-2">
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

          <div className="font-title pt-1.5 pb-0.5 flex justify-center items-center z-30">
            <Navbar isLibrary={true} />
          </div>
        </div>
      </div>
    );
  }
}
