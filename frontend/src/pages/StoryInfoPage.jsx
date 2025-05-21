import { useParams } from "react-router-dom";
import BookInfoList from "../components/BookInfoList";
import { useSelector } from "react-redux";
import BackButton from "../components/BackButton";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import HeaderNavbar from "../components/HeaderNavbar";

export default function StoryInfoPage() {
  const { stories } = useSelector((state) => state.global);
  const { id } = useParams();
  const story = stories.find((s) => s.id == id);
  const loggedUser = useSelector((state) => state.global.user);

  return story ? (
    <div className="flex flex-col bg-bg-brand max-h-screen relative overscroll-none">
      {/* Header della pagina che contiene searchbar, hamburger manu e profileIcon */}
      <HeaderNavbar user={loggedUser} />

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
        <Navbar user={loggedUser} />
      </div>
    </div>
  ) : (
    <p>Storia non trovata.</p>
  );
}
