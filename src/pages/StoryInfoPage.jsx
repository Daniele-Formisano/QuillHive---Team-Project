import { useNavigate, useParams } from "react-router-dom";
import BookInfoList from "../components/BookInfoList";
import { useSelector } from "react-redux";
import HamburgerMenu from "../components/HamburgherMenu";
import Searchbar from "../components/Searchbar";
import ProfileIcon from "../components/ProfileIcon";
import BackButton from "../components/BackButton";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function StoryInfoPage() {
  const { stories } = useSelector((state) => state.global);
  const { id } = useParams();
  const story = stories.find((s) => s.id == id);
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.global.user);

  const handleProfileClick = () => {
    navigate(loggedUser ? `/profile/${loggedUser.id}` : "/login");
  }; //reindirezzamento al proprio profilo

  return story ? (
    <div className="flex flex-col bg-bg-brand max-h-screen relative overscroll-none">
      {/* Header della pagina che contiene searchbar, hamburger manu e profileIcon */}
      <header className="flex justify-between items-center px-4 py-2 mb-2">
        <div>
          <HamburgerMenu />
        </div>
        <div>
          <Searchbar />
        </div>
        <div>
          <ProfileIcon onClick={handleProfileClick} height={50} width={50} />
        </div>
      </header>

      {/* Sezione main della pagina che contiene le info della storia prese dal componente */}
      <main className="overflow-scroll">
        <div className="pl-2">
          <BackButton pageURL={"/home"} />
        </div>
        <BookInfoList story={story} user={loggedUser} />
        {/* Sezione del footer */}
        <div className="mt-10 px-6">
          <Footer />
        </div>
      </main>
      <div className="fixed bottom-0 w-full">
        <Navbar />
      </div>
    </div>
  ) : (
    <p>Storia non trovata.</p>
  );
}
