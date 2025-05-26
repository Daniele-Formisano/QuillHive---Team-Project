import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserProjectsQuery,
  useLazyGetUsersQuery,
  useUpdateUserMutation,
} from "../services/apiService";
import { useEffect, useRef, useState } from "react";
import ProfileIcon from "./ProfileIcon";
import { setUser } from "../features/global/globalSlice";
import Button from "./Button";
import Card from "./Card";
import Checkbox from "./Checkbox";
import ButtonEdit from "./ButtonEdit";
import toast from "react-hot-toast";
import ButtonAddFile from "./ButtonAddFile";
import Loader from "./Loader";
import clsx from "clsx";
import CreateStoryCard from "./CreateStoryCard";

export default function ProfileSection({ user, isOwn }) {
  const { languages, artistTypes } = useSelector((state) => state.global);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [triggerGetUser] = useLazyGetUsersQuery();

  /* Chiamata per ricevere i progetti dell'utente */
  const {
    data: userProjects,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetUserProjectsQuery(user?.id);

  /* useEffect che, raccolti i dati da userLanguages e userArtistType, li mette in relazione con le lingue e gli artisti e li aggiunge all'utente visualizzabile */

  const pronouns = [
    { id: 1, name: "He/Him" },
    { id: 2, name: "She/Her" },
    { id: 3, name: "They/Them" },
    { id: 4, name: "Prefer not to say" },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [updateUser, { data, isLoading, error }] = useUpdateUserMutation();
  const loggedUserId = useSelector((state) => state.global.user?.id);

  function handleSetIsEdititing() {
    setIsEditing(true);
  }

  // Funzione per eseguire la richiesta API per la verifica dell'username
  async function checkUsernameExists(username) {
    try {
      const response = await triggerGetUser({ username: username.trim() });

      // Verifica che la risposta contenga effettivamente i dati
      if (response.data && response.data.length > 0) {
        toast.error("This username is already used, please choose another one");
        return false; // Se l'username esiste già, restituisce false
      }
      return true; // Se l'username non esiste, restituisce true
    } catch (error) {
      console.error("Error checking username:", error);
      toast.error("Error checking username. Please try again.");
      return false;
    }
  }

  /* Funzione che permette il change dell'input */
  function handleChangeInput(e) {
    const { name, value } = e.target;

    // controllo che visualizza un messaggio di errore se si supera la max length
    if (name === "username" && value.length === 12) {
      toast("You can't type more the 12 letters", {
        icon: "⚠️",
        duration: 4000,
      });
    }

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  /* Funzione che aggiorna l'array di lingue selezionate */
  function handleChecked(item, fieldName) {
    setUserData((prevData) => {
      const currentField = prevData[fieldName] || [];

      const isAlreadySelected = currentField.some((i) => i.id === item.id);

      // Se si tratta di artistType, applica il limite di 2
      if (
        fieldName === "artistTypes" &&
        !isAlreadySelected &&
        currentField.length >= 2
      ) {
        toast.error("You can't select more than 2 artist types");
        return prevData; // non aggiorna lo stato
      }

      const updatedArray = isAlreadySelected
        ? currentField.filter((i) => i.id !== item.id)
        : [...currentField, item];

      return {
        ...prevData,
        [fieldName]: updatedArray,
      };
    });
  }

  /* Funzione che aggiorna i dati dell'utente con i nuovi inseriti nell'input */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prima di aggiornare i dati dell'utente, verifica se l'username è già in uso
    if (userData.username !== user.username) {
      const usernameAvailable = await checkUsernameExists(userData.username);
      if (!usernameAvailable) return;
    }

    const updatedUser = { id: userData.id, ...userData };
    console.log(updatedUser);

    try {
      const response = await updateUser(updatedUser).unwrap();

      dispatch(setUser(updatedUser));
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUserData(updatedUser);

      toast.success("Profile successfully updated!");
      setIsEditing(false);
    } catch (error) {
      console.error("Errore nell'aggiornamento:", error);
      toast.error("Something went wrong updating your profile.");
    }
  };

  if (isLoadingProjects) return <Loader />;
  if (errorProjects) return <p>Error </p>;
  if (!userProjects) return <p>No projects</p>;

  if (userData) {
    return (
      <div className="flex flex-col justify-center overflow-y-scroll overflow-x-hidden px-10 py-5">
        {isEditing ? (
          <form
            className="flex flex-col gap-4 w-full font-script"
            onSubmit={handleSubmit}
          >
            {/* Div che contiene l'svg con l'immagine renderizzata in base all'url presente in user */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative">
                <ProfileIcon
                  width={"w-[200px]"}
                  height={"h-[200px]"}
                  user={user}
                />
                <div className="absolute  top-0.5 right-5.5 transform  translate-y-1">
                  <ButtonAddFile />
                </div>
              </div>
              <div className="flex flex-col gap-2 text-secondary-brand items-center">
                <input
                  minLength="4"
                  maxLength="12"
                  value={userData.username || ""}
                  name="username"
                  onChange={handleChangeInput}
                  className="w-full text-4xl p-2 border rounded-md resize-none border-primary-brand"
                />
                <ul className="grid grid-cols-2 gap-2 ">
                  {artistTypes.map((artist) => (
                    <Checkbox
                      key={artist.id}
                      onChange={() => {
                        handleChecked(artist, "artistTypes");
                      }}
                      id={`artist-${artist.id}`}
                      checked={userData.artistTypes?.some(
                        (a) => a.id == artist.id
                      )}
                    >
                      {artist.name}
                    </Checkbox>
                  ))}
                </ul>
                <select
                  value={userData.pronouns}
                  onChange={handleChangeInput}
                  name="pronouns"
                >
                  {pronouns.map((pronoun) => (
                    <option key={pronoun.id} value={pronoun.name}>
                      {pronoun.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sezione che contiene la bio dell'utente */}
            <div className="flex flex-col gap-3 w-full">
              <h3 className="font-title text-2xl  text-secondary-brand">Bio</h3>
              <hr className="bg-hr-brand h-0.5 border-0 rounded-4xl w-full mb-3" />
              <textarea
                value={userData.bio || ""}
                name="bio"
                onChange={handleChangeInput}
                className="w-full p-2 border rounded-md resize-none border-primary-brand"
                rows={3} // Numero minimo di righe visibili
              />
            </div>

            {/* Sezione che contiene la email dell'utente */}
            <div className="flex flex-col gap-3 w-full text-secondary-brand">
              <h3 className="font-title text-2xl text-secondary-brand">
                Email
              </h3>
              <hr className="bg-hr-brand h-0.5 border-0 rounded-4xl w-full" />
              <span>{userData.email}</span>
            </div>

            {/* Sezione che contiene le lingue dell'utente */}
            <div className="flex flex-col gap-3 w-full text-secondary-brand">
              <h3 className="font-title text-2xl text-secondary-brand">
                Language
              </h3>
              <hr className="bg-hr-brand h-0.5 border-0 rounded-4xl " />
              <div className="flex flex-col">
                <ul className="flex flex-col gap-2">
                  {languages.map((language) => (
                    <Checkbox
                      key={language.id}
                      onChange={() => {
                        handleChecked(language, "languages");
                      }}
                      id={language.id}
                      checked={userData.languages?.some(
                        (lang) => lang.id == language.id
                      )}
                    >
                      {language.language}
                    </Checkbox>
                  ))}
                </ul>
              </div>
            </div>

            <Button isColorYellow={true} type="submit">
              Save
            </Button>
            {/* Sezione che contiene i progetti dell'utente */}
            <div className="flex flex-col gap-3 w-full">
              <h3 className="font-title text-2xl text-secondary-brand">
                My Projects
              </h3>
              <hr className="bg-hr-brand h-0.5 border-0 rounded-4xl" />
              <div className="">
                <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
                  {userProjects.length > 0 ? (
                    userProjects.map((project) => (
                      <Card key={project.id} story={project} />
                    ))
                  ) : (
                    <p className="font-script text-secondary-brand">
                      You haven't created any story yet...
                    </p>
                  )}
                </ul>
              </div>
            </div>
          </form>
        ) : (
          <div className=" max-w-screen font-script">
            {isOwn && (
              <div className="flex justify-end pr-10">
                {<ButtonEdit handleClick={handleSetIsEdititing} />}
              </div>
            )}
            <div className="flex flex-col gap-4 w-full">
              {/* Div che contiene l'svg con l'immagine renderizzata in base all'url presente nell'user */}
              <div className="flex flex-col items-center mb-8 gap-2 text-secondary-brand">
                <ProfileIcon
                  width={"w-[200px]"}
                  height={"h-[200px]"}
                  user={user}
                />

                <div className="flex flex-col items-center font-script-semibold gap-1">
                  <h2 className="text-4xl  text-secondary-brand">
                    {user.username}
                  </h2>
                  <ul className="flex gap-2">
                    {user.artistTypes?.map((artist, index) => (
                      <li
                        className="text-xl font-script-semibold text-secondary-brand"
                        key={artist.id}
                      >
                        {artist.name}
                        {index !== user.artistTypes.length - 1 && ","}
                      </li>
                    ))}
                  </ul>
                  <span className="text-secondary-brand text-m font-script-semibold">
                    {user.pronouns}
                  </span>
                </div>
              </div>
              {/* Sezione che contiene la bio dell'utente */}
              <div className="flex flex-col gap-3 w-full mb-5 text-secondary-brand">
                <h3 className="font-title text-2xl  text-secondary-brand">
                  Bio
                </h3>
                <hr className="bg-hr-brand h-0.5 border-0 rounded-4xl w-full" />
                <div>
                  <span>{user.bio}</span>
                </div>
              </div>
              {/* Sezione che contiene la email dell'utente */}
              <div className="flex flex-col gap-3 w-full mb-5 text-secondary-brand">
                <h3 className="font-title text-2xl  text-secondary-brand">
                  Email
                </h3>
                <hr className="bg-hr-brand h-0.5 border-0 rounded-4xl w-full" />
                <div>
                  <span>{user.email}</span>
                </div>
              </div>
              {/* Sezione che contiene le lingue dell'utente */}
              <div className="flex flex-col gap-3 w-full mb-5 text-secondary-brand">
                <h3 className="font-title text-2xl text-secondary-brand">
                  Language
                </h3>
                <hr className="bg-hr-brand h-0.5 border-0 rounded-4xl " />

                <ul>
                  {user.languages?.map((language) => (
                    <li key={language.id}>{language.language}</li>
                  ))}
                </ul>
              </div>
              {/* Sezione che contiene i progetti dell'utente */}
              <div className="flex flex-col gap-3 w-full mb-5">
                <h3 className="font-title text-2xl text-secondary-brand">
                  My Projects
                </h3>
                <hr className="bg-hr-brand h-0.5 border-0 rounded-4xl" />
                <div className="">
                  <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
                    {userProjects.stories.length > 0 &&
                      userProjects.stories.map((project) => (
                        <Card key={project.id} story={project} />
                      ))}
                    {isOwn && (
                      <li className="mt-8">
                        <CreateStoryCard />
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
