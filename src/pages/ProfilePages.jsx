import { useSelector } from "react-redux";
import LogoutButton from "../components/LogoutButton";
import BackButton from "../components/BackButton";
import ProfileSection from "../components/ProfileSection";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useLazyGetUsersQuery } from "../services/apiService";
import toast from "react-hot-toast";

export default function ProfilePages() {
  const loggedUser = useSelector((state) => state.global.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [trigger, { isLoading }] = useLazyGetUsersQuery();

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await trigger({ id }).unwrap();
        console.log("Data from trigger:", data); // Logga i dati ricevuti

        // Assicurati che data sia un oggetto valido
        if (data && typeof data === "object" && !Array.isArray(data)) {
          setUser(data);
        } else if (Array.isArray(data) && data.length > 0) {
          setUser(data[0]);
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        toast.error("User not found, redirected to login");
        navigate("/login");
      }
    }

    console.log(user);

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (isLoading || !user) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <div className="bg-bg-brand">
      {/* Parte superiore della pagina che contine il bottone di logout e il backButton */}
      <div className="flex justify-between items-center py-2 px-4">
        <BackButton pageURL={-1} />

        {loggedUser?.id === id && <LogoutButton />}
      </div>
      {/* Sezione che contiene il form con le informazioni dell'utente */}
      <section>
        <ProfileSection user={user} urlId={id} />
      </section>
      {/* Sezione che contiene il footer */}
      <section className="px-6 mt-6">
        <Footer />
      </section>
    </div>
  );
}
