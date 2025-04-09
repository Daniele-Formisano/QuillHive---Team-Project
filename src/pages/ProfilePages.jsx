import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/global/globalSlice";
import LogoutButton from "../components/LogoutButton";
import BackButton from "../components/BackButton";
import ProfileSection from "../components/ProfileSection";

export default function ProfilePages() {
  return (
    <div className="bg-bg-brand">
      {/* Parte superiore della pagina che contine il bottone di logout e il backButton */}
      <div className="flex justify-between items-center py-2 px-4">
        <BackButton pageURL={"/home"} />

        <LogoutButton />
      </div>

      {/* Sezione che contiene il form con le informazioni dell'utente */}
      <section>
        <ProfileSection />
      </section>
      <section>{/* Sezione che contiene il footer */}</section>
    </div>
  );
}
