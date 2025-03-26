import { useDispatch } from "react-redux";
import Card from "../components/Card";
import HamburgerMenu from "../components/hamburgherMenu";
import Navbar from "../components/navbar";
import Searchbar from "../components/Searchbar";
import { useGetStoriesQuery, useGetUsersQuery } from "../services/apiService";
import { setStories } from "../features/global/globalSlice";
import AuthorIconButton from "../components/AuthorIconButton";

//div Header (hamburger menu, search, profile)
//travel in the hive(div( map of componet that displys authors))
// buzzing for you (no display if not logged) (div(map of card book component))
//hive's choice (div(map of card book component))
// footer navbar z index position fixed

function Home() {
  // const { data: users, isLoading, error } = useGetUsersQuery();
  // if (isLoading) return <p>Loading</p>;
  // if (error) return <p>Error </p>;
  // if (!stories || stories.length === 0) return <p>No users</p>;

  const {
    data: stories,
    error: storiesError,
    isLoading: storiesLoading,
  } = useGetStoriesQuery();

  // const dispatch= useDispatch();
  // dispatch(setStories(stories))

  if (storiesLoading) return <p>Loading</p>;
  if (storiesError) return <p>Error </p>;
  if (!stories || stories.length === 0) return <p>No stories</p>;

  const limitedStories = stories.slice(0, 7);

  console.log(users);
  debugger
  return (
    <div className="flex flex-col justify-center  bg-bg-brand ">
      <header className="flex flex-row gap-2 justify-between items-center fixed top-0 left-0 right-0 bg-bg-brand ">
        <div className="w-9 h-7"></div>
        <HamburgerMenu />
        <Searchbar />
        <button className="w-[54px] h-[54]">P</button>
      </header>
      <main className=" flex flex-col justify-center overflow-y-scroll pl-5 pb-16 pt-16 scrollbar-hide ">
        <div className="flex flex-row gap-4 mb-5 pt">
          <p className="text-secondary-brand font-title text-center text-2xl ">
            Travel in the hive
          </p>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <AuthorIconButton user={user} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-secondary-brand font-title text-2xl">
            Buzzing for you
          </p>
          <div className="">
            <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
              {limitedStories.map((story) => (
                <Card key={story.id} story={story} />
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-secondary-brand font-title text-2xl">
            Hive's choices
          </p>
          <div className="">
            <ul className="flex flex-row gap-5 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide  ">
              {limitedStories.map((story) => (
                <Card key={story.id} story={story} />
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-center mb-10">
          <p className="text-secondary-brand font-title text-2xl ">
            Trending now
          </p>
          <div className="">
            <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
              {limitedStories.map((story) => (
                <Card key={story.id} story={story} />
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-center mb-10">
          <p className="text-secondary-brand font-title text-2xl ">
            Collab Spotlight
          </p>
          <div className="">
            <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
              {limitedStories.map((story) => (
                <Card key={story.id} story={story} />
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-center mb-10">
          <p className="text-secondary-brand font-title text-2xl ">
            QuillHive Originals
          </p>
          <div className="">
            <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
              {limitedStories.map((story) => (
                <Card key={story.id} story={story} />
              ))}
            </ul>
          </div>
        </div>
        <footer>Footer</footer>
      </main>
      <div className=" flex justify-center fixed font-title bottom-0 left-0 right-0 z-50">
        <Navbar />
      </div>
    </div>
  );
}
export default Home;
