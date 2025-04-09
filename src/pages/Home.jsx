import Card from "../components/Card";
import HamburgerMenu from "../components/HamburgherMenu";
import Navbar from "../components/navbar";
import Searchbar from "../components/Searchbar";
import { useGetStoriesQuery, useGetUsersQuery } from "../services/apiService";
import { setStories } from "../features/global/globalSlice";
import AuthorIconButton from "../components/AuthorIconButton";
import ProfileIcon from "../components/ProfileIcon";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import BookModal from "../components/BookModal";

function Home() {
  const { data: users, isLoading, error } = useGetUsersQuery();

  const {
    data: stories,
    error: storiesError,
    isLoading: storiesLoading,
  } = useGetStoriesQuery();

  const [selectedStory, setSelectedStory] = useState(null);

  const navigate = useNavigate();

  if (isLoading) return <p>Loading</p>;
  if (error) return <p>Error </p>;
  if (!users || users.length === 0) return <p>No users</p>;

  if (storiesLoading) return <p>Loading</p>;
  if (storiesError) return <p>Error </p>;
  if (!stories || stories.length === 0) return <p>No stories</p>;

  // Crea una mappa degli utenti per trovare rapidamente il nome dell'autore
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user.username;
    return acc;
  }, {});

  // Aggiungi il nome dell'autore a ciascuna storia
  const storiesWithAuthors = stories.map((story) => {
    const authorName = userMap[story.userId] || "Sconosciuto";
    return {
      ...story,
      authorName,
    };
  });

  const handleProfileClick = () => {
    navigate("/editProfile");
  }; //reindirezzamento al proprio profilo

  return (
    <div className="flex flex-col justify-center max-h-screen  bg-bg-brand ">
      <header className="flex flex-row gap-2  justify-around items-center bg-bg-brand z-45">
        <HamburgerMenu />

        <Searchbar />
        <div>
          <ProfileIcon width={50} height={50} onClick={handleProfileClick} />
        </div>
      </header>
      <main className=" flex flex-col  justify-center overflow-y-scroll pl-5 pt-80 scrollbar-hide  ">
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
              {storiesWithAuthors.map((story) => (
                <Card
                  key={story.id}
                  story={story}
                  onClick={() => setSelectedStory(story)}
                />
              ))}
            </ul>
          </div>
        </div>
        <div>
          {/* <div className="flex flex-col justify-center">
          <p className="text-secondary-brand font-title text-2xl">
            Hive's choices
          </p>
          <div className="">
            <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide  ">
              {storiesWithAuthors.map((story) => (
                <Card key={story.id} story={story} onClick={() => setSelectedStory(story)} />
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
              {storiesWithAuthors.map((story) => (
                <Card key={story.id} story={story} onClick={() => setSelectedStory(story)}/>
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
              {storiesWithAuthors.map((story) => (
                <Card key={story.id} story={story} onClick={() => setSelectedStory(story)}/>
              ))}
            </ul>
          </div>
        </div> */}
        </div>
        {/* controllare se mb-10 è necessario */}
        <div className="flex flex-col justify-center mb-10">
          <p className="text-secondary-brand font-title text-2xl ">
            QuillHive Originals
          </p>
          <div className="">
            <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
              {storiesWithAuthors.map((story) => (
                <Card key={story.id} story={story} />
              ))}
            </ul>
          </div>
        </div>

        <footer>Footer</footer>
      </main>
      {/* z-index serve per non scivolare sotto l'overlay delal modal, attenzione ai conflitti con hamburgherMenu */}
      <div className=" font-title pt-1.5 pb-0.5 flex justify-center items-center z-30">
        <Navbar />
      </div>
      <BookModal
        story={selectedStory}
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </div>
  );
}
export default Home;
