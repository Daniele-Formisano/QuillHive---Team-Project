import { useDispatch, useSelector } from "react-redux";
import {
  useGetLanguagesQuery,
  useGetUserArtistTypesQuery,
  useGetUserLanguagesQuery,
  useGetUserProjectsQuery,
  useLazyGetUserLanguagesQuery,
  useLazyGetUsersQuery,
  useUpdateUserMutation,
} from "../services/apiService";
/* import { useUserLanguages } from "../utils/useCustomHook"; */
import InputField from "./InputField";
import { useEffect, useRef, useState } from "react";
import ProfileIcon from "./ProfileIcon";
import { setUser } from "../features/global/globalSlice";
import Button from "./Button";
import Card from "./Card";
import { IconCircleDashedPlus } from "@tabler/icons-react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Checkbox from "./Checkbox";
import RemoveButton from "./RemoveButton";
import ButtonEdit from "./ButtonEdit";
import toast from "react-hot-toast";
import ButtonAddFile from "./ButtonAddFile";

export default function ProfileSection({ user, urlId }) {
  const { languages, artistType } = useSelector((state) => state.global);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [triggerGetUser] = useLazyGetUsersQuery();
  console.log(userData);

  /* Chiamata per ricevere gli userArtistTypes */
  const {
    data: userArtistTypes,
    isLoading: isLoadingUserArtistTypes,
    error: errorUserArtistTypes,
  } = useGetUserArtistTypesQuery(user.id);

  /* Chiamata per ricevere i progetti dell'utente */
  const {
    data: userProjects,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetUserProjectsQuery(user.id);

  /* Chiamata per ricevere le lingue dell'utente */
  const {
    data: userLanguages,
    isLoading: isLoadingUserLanguages,
    error: errorUserLanguages,
  } = useGetUserLanguagesQuery(urlId);

  console.log(userLanguages);
  console.log(userArtistTypes);

  /* useEffect che, raccolti i dati da userLanguages e userArtistType, li mette in relazione con le lingue e gli artisti e li aggiunge all'utente visualizzabile */

  useEffect(() => {
    console.log(user);
    // Se l'utente ha già artistType salvato (da localStorage), non sovrascriverlo

    if (
      userArtistTypes &&
      userArtistTypes.length > 0 &&
      userLanguages &&
      userLanguages.length > 0
    ) {
      const userArtistTypesId = userArtistTypes.map(
        (userArtist) => userArtist.artistTypeId
      );

      const userLangugesId = userLanguages.map(
        (userLanguage) => userLanguage.languageId
      );

      const userArtistsList = artistType.filter((artist) =>
        userArtistTypesId.includes(artist.id)
      );

      const userLanguagesList = languages.filter((lang) =>
        userLangugesId.includes(lang.id)
      );

      const updatedUser = {
        ...user,
        artistType: userArtistsList,
        languages: userLanguagesList,
      };

      setUserData(updatedUser);
    } else {
      const updatedUser = { ...user, artistType: [] };
      setUserData(updatedUser);
    }
  }, [userArtistTypes, artistType, userLanguages, languages]);

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
  const loggedUserId = useSelector((state) => state.global.user.id);

  const isOwner = urlId === loggedUserId;
  console.log(loggedUserId);

  function handleSetIsEdititing() {
    setIsEditing(true);
  }

  // funzione che aggiorna e verifica i dati dell'utente
  const handleUpdateData = async () => {
    const updatedUser = { ...user, ...userData };

    try {
      const res = await updateUser(updatedUser).unwrap(); // unwrap per gestire errori facilmente
      console.log("Utente aggiornato:", res);
      // opzionale: dispatch(setUser(res)) se vuoi aggiornare lo stato manualmente
    } catch (err) {
      console.error("Errore nell'aggiornamento:", err);
    }
  };

  // Funzione per eseguire la richiesta API per la verifica dell'username
  async function checkUsernameExists(username) {
    try {
      const response = await triggerGetUser({ username: username.trim() });

      // Log della risposta per controllare la struttura
      console.log("Response from API:", response);

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
        fieldName === "artistType" &&
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
    const usernameAvailable = await checkUsernameExists(userData.username);

    if (!usernameAvailable) return;

    const mergedUserData = { ...user, ...userData };

    /* try {
      const res = await updateUser(mergedUserData).unwrap(); // unwrap per gestire errori facilmente
      console.log("Utente aggiornato:", res);
      // opzionale: dispatch(setUser(res)) se vuoi aggiornare lo stato manualmente
    } catch (err) {
      console.error("Errore nell'aggiornamento:", err);
    } */

    dispatch(setUser(mergedUserData));
    setUserData(mergedUserData);
    /* handleUpdateData(); */

    localStorage.setItem("user", JSON.stringify(mergedUserData));
    setUserData(mergedUserData);

    setIsEditing(false);
  };

  if (isLoadingProjects) return <p>Loading</p>;
  if (errorProjects) return <p>Error </p>;
  if (!userProjects || userProjects.length === 0) return <p>No stories</p>;

  if (isLoadingUserArtistTypes) return <p>Loading</p>;
  if (errorUserArtistTypes) return <p>Error </p>;
  if (!userArtistTypes || userArtistTypes.length === 0)
    return <p>No artists</p>;
  if (userData) {
    return (
      <div className="flex flex-col justify-center items-center overflow-y-scroll overflow-x-hidden px-10 py-5">
        {isEditing ? (
          <form
            className="flex flex-col gap-4 w-full px-4"
            onSubmit={handleSubmit}
          >
            {/* Div che contiene l'svg con l'immagine renderizzata in base all'url presente in user */}
            <div className="flex flex-col items-center mb-10">
              <div className="relative">
                <ProfileIcon size="w-[200px] h-[300px]" className="relative" />
                <div className="absolute  top-0.5 right-5.5 transform  translate-y-1">
                  <ButtonAddFile />
                </div>
              </div>
              <div className="flex flex-col gap-2 text-secondary-brand items-center">
                <input
                  minLength="4"
                  maxLength="14"
                  value={userData.username || ""}
                  name="username"
                  onChange={handleChangeInput}
                  className="w-full text-4xl p-2 border rounded-md resize-none "
                />
                <ul className="grid grid-cols-2 gap-2 ">
                  {artistType.map((artist) => (
                    <Checkbox
                      key={artist.id}
                      onChange={() => {
                        handleChecked(artist, "artistType");
                      }}
                      id={`artist-${artist.id}`}
                      checked={userData.artistType?.some(
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
              <hr className="bg-hr-brand h-1 border-0 rounded-4xl w-full mb-3" />
              <textarea
                value={userData.bio || ""}
                name="bio"
                onChange={handleChangeInput}
                className="w-full p-2 border rounded-md resize-none "
                rows={3} // Numero minimo di righe visibili
              />
            </div>

            {/* Sezione che contiene la email dell'utente */}
            <div className="flex flex-col gap-3 w-full">
              <h3 className="font-title text-2xl  text-secondary-brand">
                Email
              </h3>
              <hr className="bg-hr-brand h-1 border-0 rounded-4xl w-full" />
              <span>{user.email}</span>
            </div>

            {/* Sezione che contiene le lingue dell'utente */}
            <div className="flex flex-col gap-3 w-full">
              <h3 className="font-title text-2xl text-secondary-brand">
                Language
              </h3>
              <hr className="bg-hr-brand h-1 border-0 rounded-4xl " />
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
              <hr className="bg-hr-brand h-1 border-0 rounded-4xl" />
              <div className="">
                <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
                  {userProjects.map((project) => (
                    <Card key={project.id} story={project} />
                  ))}
                </ul>
              </div>
            </div>
          </form>
        ) : (
          <div className=" max-w-screen">
            {isOwner && (
              <div className="flex justify-end pr-10">
                {<ButtonEdit handleClick={handleSetIsEdititing} />}
              </div>
            )}
            <div className="flex flex-col gap-4 w-full px-6 ">
              {/* Div che contiene l'svg con l'immagine renderizzata in base all'url presente nell'user */}
              <div className="flex flex-col items-center mb-8 gap-2">
                <ProfileIcon width={200} height={200} />

                <div className="flex flex-col items-center font-script-semibold gap-1">
                  <h2 className="text-4xl  text-secondary-brand">
                    {userData.username}
                  </h2>
                  <ul className="flex gap-2">
                    {userData.artistType?.map((artist, index) => (
                      <li
                        className="text-xl font-script-semibold text-secondary-brand"
                        key={artist.id}
                      >
                        {artist.name}
                        {index !== userData.artistType.length - 1 && ","}
                      </li>
                    ))}
                  </ul>
                  <span className="text-secondary-brand text-m font-script-semibold">
                    {userData.pronouns}
                  </span>
                </div>
              </div>
              {/* Sezione che contiene la bio dell'utente */}
              <div className="flex flex-col gap-3 w-full mb-5">
                <h3 className="font-title text-2xl  text-secondary-brand">
                  Bio
                </h3>
                <hr className="bg-hr-brand h-1 border-0 rounded-4xl w-full" />
                <div>
                  <span>{userData.bio}</span>
                </div>
              </div>
              {/* Sezione che contiene la email dell'utente */}
              <div className="flex flex-col gap-3 w-full mb-5">
                <h3 className="font-title text-2xl  text-secondary-brand">
                  Email
                </h3>
                <hr className="bg-hr-brand h-1 border-0 rounded-4xl w-full" />
                <div>
                  <span>{user.email}</span>
                </div>
              </div>
              {/* Sezione che contiene le lingue dell'utente */}
              <div className="flex flex-col gap-3 w-full mb-5">
                <h3 className="font-title text-2xl text-secondary-brand">
                  Language
                </h3>
                <hr className="bg-hr-brand h-1 border-0 rounded-4xl " />

                <ul>
                  {userData.languages?.map((language) => (
                    <li key={language.id}>{language.language}</li>
                  ))}
                </ul>
              </div>
              {/* Sezione che contiene i progetti dell'utente */}
              <div className="flex flex-col gap-3 w-full mb-5">
                <h3 className="font-title text-2xl text-secondary-brand">
                  My Projects
                </h3>
                <hr className="bg-hr-brand h-1 border-0 rounded-4xl" />
                <div className="">
                  <ul className="flex flex-row gap-4 overflow-x-scroll space-x-4 snap-x snap-mandatory scrollbar-hide ">
                    {userProjects.map((project) => (
                      <Card key={project.id} story={project} />
                    ))}
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
