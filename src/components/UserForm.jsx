import { useDispatch, useSelector } from "react-redux";
import {
  useAddBioMutation,
  useGetLanguagesQuery,
  useGetUserProjectsQuery,
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

export default function UserForm() {
  const {
    user: loggedUser,
    languages,
    artistType,
  } = useSelector((state) => state.global);

  const [isEditing, setIsEditing] = useState(true);
  const [userData, setUserData] = useState(loggedUser);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdLanguages, setSelectedIdLanguages] = useState(
    loggedUser.languages.map((language) => language)
  );

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;

      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [userData.bio]);

  /* Chiamata per ricevere i progetti dell'utente */
  const {
    data: userProjects,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useGetUserProjectsQuery(loggedUser.id);

  if (isLoadingProjects) return <p>Loading</p>;
  if (errorProjects) return <p>Error </p>;
  console.log(userProjects);
  if (!userProjects || userProjects.length === 0) return <p>No stories</p>;

  /* Funzione che permette il change dell'input */
  function handleChangeInput(e) {
    const { name, value } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  /* Funzione che aggiorna i dati dell'utente con i nuovi inseriti nell'input */

  function handleSubmit(e) {
    e.preventDefault();
    const updatedUser = { ...loggedUser, ...userData };

    dispatch(setUser(updatedUser));

    setIsEditing(false);
  }

  console.log(selectedIdLanguages);
  /* Funzione che aggiorna l'array di lingue selezionate */

  function handleChecked(language) {
    setSelectedIdLanguages((prevLang) => {
      if (prevLang.some((lang) => lang.id == language.id)) {
        return prevLang.filter((lang) => lang.id !== language.id);
      } else {
        return [...prevLang, language];
      }
    });
  }

  /* Funzione che annulla le modifiche delle lingue se non salvate */
  function handleLangCancel() {
    setSelectedIdLanguages(loggedUser.languages.map((language) => language));
  }

  /* Funzione che salva le modifiche delle lingue e le setta sia nello stato del redux che nel localStorage */
  function handleLangSave() {
    const updatedUser = { ...loggedUser, languages: selectedIdLanguages };
    dispatch(setUser(updatedUser));
  }

  return (
    <div className="flex flex-col justify-center items-center overflow-scroll p-10">
      <form className="flex flex-col items-center justify-center gap-8 w-full">
        {/* Div che contiene l'svg con l'immagine renderizzata in base all'url presente nell'user */}
        <div className="flex flex-col items-center mb-10">
          <ProfileIcon width={200} height={200} />

          <div>
            <h2 className="text-4xl  text-secondary-brand">
              {loggedUser.username}
            </h2>
            {isEditing ? (
              <input
                value={userData.pronouns || ""}
                name="pronouns"
                onChange={handleChangeInput}
              ></input>
            ) : (
              <span className="text-secondary-brand text-sm ml-4">
                {loggedUser.pronouns}
              </span>
            )}
          </div>

          <h3>Writer</h3>
        </div>

        {/* Sezione che contiene la bio dell'utente */}
        <div className="flex flex-col gap-3 w-full">
          <h3 className="font-title text-2xl  text-secondary-brand">Bio</h3>
          <hr className="bg-hr-brand h-1 border-0 rounded-4xl w-full" />
          {isEditing ? (
            <div>
              <textarea
                value={userData.bio || ""}
                ref={textareaRef}
                name="bio"
                onChange={handleChangeInput}
                className="w-full p-2 border rounded-md resize-none "
                rows={3} // Numero minimo di righe visibili
              />
              <Button isColorYellow={true} onClick={handleSubmit}>
                Save
              </Button>
            </div>
          ) : (
            <div>
              <span>{loggedUser.bio}</span>
            </div>
          )}
        </div>

        {/* Sezione che contiene la email dell'utente */}
        <div className="flex flex-col gap-3 w-full">
          <h3 className="font-title text-2xl  text-secondary-brand">Email</h3>
          <hr className="bg-hr-brand h-1 border-0 rounded-4xl w-full" />
          <div>
            <span>{loggedUser.email}</span>
          </div>
        </div>

        {/* Sezione che contiene le lingue dell'utente */}
        <div className="flex flex-col gap-3 w-full">
          <h3 className="font-title text-2xl text-secondary-brand">Language</h3>
          <hr className="bg-hr-brand h-1 border-0 rounded-4xl " />
          {isEditing ? (
            <div className="flex flex-col gap-4">
              <ul className="flex flex-col gap-2">
                {loggedUser.languages.map((language) => (
                  <div className="flex ">
                    <li className="grow" key={language.id}>
                      {language.language}
                    </li>
                    <RemoveButton />
                  </div>
                ))}
              </ul>
              <button type="button" onClick={() => setIsOpen(true)}>
                <IconCircleDashedPlus stroke={2} size={24} color="#203955" />
              </button>
              <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
              >
                <div className="fixed inset-0 bg-black opacity-50 backdrop-blur-sm"></div>

                <div className="fixed inset-0 text-secondary-brand font-script flex w-screen items-center justify-center p-4">
                  <DialogPanel className=" max-w-lg  space-y-4 border border-primary-brand bg-bg-brand px-10 py-8 rounded-xl">
                    <DialogTitle className=" font-title text-xl text-center">
                      Change your languages
                    </DialogTitle>

                    <p className="text-sm ">Select one or more...</p>
                    <ul>
                      {languages.map((language) => (
                        <Checkbox
                          key={language.id}
                          onChange={() => {
                            handleChecked(language);
                          }}
                          id={language.id}
                          checked={selectedIdLanguages.some(
                            (lang) => lang.id == language.id
                          )}
                        >
                          {language.language}
                        </Checkbox>
                      ))}
                    </ul>
                    <div className="flex gap-4 mt-8">
                      <Button
                        type={"button"}
                        onClick={() => {
                          handleLangSave();
                          setIsOpen(false);
                        }}
                        isColorYellow={true}
                      >
                        Save
                      </Button>

                      <Button
                        type={"button"}
                        onClick={() => {
                          handleLangCancel();
                          setIsOpen(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </DialogPanel>
                </div>
              </Dialog>
            </div>
          ) : (
            <ul>
              {userData.languages.map((language) => (
                <li key={language.id}>{language.language}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Sezione che contiene i progetti dell'utente */}
        <div className="flex flex-col gap-3 w-full">
          <h3 className="font-title text-2xl text-secondary-brand">
            My Projects
          </h3>
          <hr className="bg-hr-brand h-1 border-0 rounded-4xl" />
          <div className="">
            {userProjects.map((project) => (
              <Card key={project.id} story={project} />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
