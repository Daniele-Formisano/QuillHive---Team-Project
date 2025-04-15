import Card from "../components/Card";
import HamburgerMenu from "../components/HamburgherMenu";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import { useGetStoriesQuery, useGetUsersQuery } from "../services/apiService";
import AuthorIconButton from "../components/AuthorIconButton";
import ProfileIcon from "../components/ProfileIcon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Footer from "../components/Footer";

function Home() {
  const { data: users, isLoading, error } = useGetUsersQuery();

  const { user: loggedUser } = useSelector((state) => state.global);

  const {
    data: stories,
    error: storiesError,
    isLoading: storiesLoading,
  } = useGetStoriesQuery();

  const [selectedStory, setSelectedStory] = useState(null);
  console.log(loggedUser);
  const navigate = useNavigate();

  if (isLoading || storiesLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error || storiesError) return <div>Error </div>;

  //per evitare di avere tra gli autori anche il proprio profilo
  const selectedUsers = loggedUser
    ? users.filter((user) => user.id !== loggedUser.id)
    : users;

  //reindirezzamento al proprio profilo se loggato log in se non loggato
  const handleProfileClick = () => {
    if (loggedUser) {
      navigate(`/profile/${loggedUser.id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col justify-center bg-bg-brand ">
      <header className="flex flex-row gap-2 sticky top-0 justify-around items-center bg-bg-brand z-45 py-2">
        <HamburgerMenu />
        <Searchbar />
        <div className="flex justify-center items-center">
          <ProfileIcon onClick={handleProfileClick} width={50} height={50} />
        </div>
      </header>

      <main className=" flex flex-col  justify-center overflow-y-scroll pl-5 min-h-screen scrollbar-hide  ">
        <div className="flex flex-col gap-8 mb-5 pt-4">
          <p className="flex justify-start text-secondary-brand font-title text-center text-2xl ">
            Travel in the hive
          </p>
          <div className="flex flex-row  gap-2 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
            {selectedUsers.map((user) => (
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
              {stories.map((story) => (
                <Card key={story.id} story={story} />
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center">
            <p className="text-secondary-brand font-title text-2xl">
              Hive's choices
            </p>
            <div className="">
              <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide  ">
                {stories.map((story) => (
                  <Card key={story.id} story={story} />
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center mb-10">
              <p className="text-secondary-brand font-title text-2xl ">
                Trending now
              </p>
              <div className="">
                <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
                  {stories.map((story) => (
                    <Card key={story.id} story={story} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center mb-10">
            <p className="text-secondary-brand font-title text-2xl ">
              Collab Spotlight
            </p>
            <div className="">
              <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
                {stories.map((story) => (
                  <Card key={story.id} story={story} />
                ))}
              </ul>
            </div>
          </div>
          {/* controllare se mb-10 è necessario */}
          <div className="flex flex-col justify-center mb-10">
            <p className="text-secondary-brand font-title text-2xl ">
              QuillHive Originals
            </p>
            <div className=""></div>
            <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
              {stories.map((story) => (
                <Card key={story.id} story={story} />
              ))}
            </ul>
          </div>
        </div>
        <div className="pr-[20px] mb-8">
          <Footer />
        </div>
      </main>

      {/* z-index serve per non scivolare sotto l'overlay delal modal, attenzione ai conflitti con hamburgherMenu */}
      <div className=" font-title fixed bottom-0  w-full flex justify-center items-center z-30">
        <Navbar user={loggedUser} />
      </div>
    </div>
  );
}
export default Home;
