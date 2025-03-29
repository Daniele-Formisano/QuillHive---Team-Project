import { useDispatch, useSelector } from "react-redux";
import { useGetLanguagesQuery } from "../services/apiService";
/* import { useUserLanguages } from "../utils/useCustomHook"; */
import InputField from "./InputField";
import { useState } from "react";
import ProfileIcon from "./ProfileIcon";
import { setUser } from "../features/global/globalSlice";
import Button from "./Button";

export default function UserForm() {
  const loggedUser = useSelector((state) => state.global.user);
  const [isEditing, setIsEditing] = useState(true);
  const [userData, setUserData] = useState(loggedUser);
  const dispatch = useDispatch();

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
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditing(false);
  }

  console.log(loggedUser);

  return (
    <div className="flex flex-col justify-center items-center overflow-scroll">
      <form className="flex flex-col items-center justify-center gap-8">
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
                name="bio"
                onChange={handleChangeInput}
                className="w-full p-2 border rounded-md resize-none overflow-hidden"
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

        {/* Sezione che contiene le lignue dell'utente */}
        <div className="flex flex-col gap-3 w-full">
          <h3 className="font-title text-2xl text-secondary-brand">Language</h3>
          <hr className="bg-hr-brand h-1 border-0 rounded-4xl " />
          {isEditing ? (
            <InputField
              id={3}
              type={"select"}
              value={
                <ul>
                  {loggedUser.languages.map((language) => (
                    <li key={language.id}>{language.language}</li>
                  ))}
                </ul>
              }
              onChange={handleChangeInput}
            />
          ) : (
            <ul>
              {loggedUser.languages.map((language) => (
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
          <ul>{}</ul>
          {/* Mettere un map che recuperi gli userId da tutte le stories Per poi
          visualizzare solo quelle che corrispondono a quell'user */}
        </div>
      </form>
    </div>
  );
}
