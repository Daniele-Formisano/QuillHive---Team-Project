import Card from "../components/Card";
import HamburgerMenu from "../components/HamburgherMenu";
import Navbar from "../components/navbar";
import Searchbar from "../components/Searchbar";
import { useGetStoriesQuery, useGetUsersQuery } from "../services/apiService";
import { setStories } from "../features/global/globalSlice";
import AuthorIconButton from "../components/AuthorIconButton";
import ProfileIcon from "../components/ProfileIcon";
import { useNavigate } from "react-router-dom";

function Home() {
  const { data: users, isLoading, error } = useGetUsersQuery();

  const {
    data: stories,
    error: storiesError,
    isLoading: storiesLoading,
  } = useGetStoriesQuery();

  const navigate = useNavigate();

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Error </p>;
  if (!users || users.length === 0) return <p>No users</p>;

  if (storiesLoading) return <p>Loading</p>;
  if (storiesError) return <p>Error </p>;
  if (!stories || stories.length === 0) return <p>No stories</p>;

  const limitedStories = stories.slice(0, 6);

  const handleProfileClick = () => {
    navigate("/editProfile");
  }; //reindirezzamento al proprio profilo

  return (
    <div className="flex flex-col justify-center  bg-bg-brand min-h-screen ">
      <header className="flex flex-row gap-2 justify-around items-center fixed top-0 left-0 right-0 bg-bg-brand ">
        <div>
          <HamburgerMenu />
        </div>

        <Searchbar />
        <div>
          <ProfileIcon width={50} height={50} onClick={handleProfileClick} />
        </div>
      </header>
      <main className=" flex flex-col justify-center overflow-y-scroll pl-5 pb-16 pt-16 scrollbar-hide ">
        <div className="flex flex-col gap-8 mb-5 ">
          <p className="flex justify-start text-secondary-brand font-title text-center text-2xl ">
            Travel in the hive
          </p>
          <div className="flex flex-row  gap-2 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
            {users.map((user) => (
              <AuthorIconButton key={user.id} user={user} />
            ))}
          </div>
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
        {/* <div className="flex flex-col justify-center">
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
        </div> */}
        <footer>Footer</footer>
      </main>
      <div className=" flex justify-center fixed font-title bottom-0 left-0 right-0 ">
        <Navbar />
      </div>
    </div>
  );
}
export default Home;
