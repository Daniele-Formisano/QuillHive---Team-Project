import { useGetLanguagesQuery } from "../services/apiService";
import { useUserLanguages } from "../utils/useUserLanguages";
import InputField from "./InputField";

export default function UserForm({ loggedUser }) {
  const userLanguages = useUserLanguages();
  function onChange() {}

  return (
    <div className="flex flex-col">
      <form className="flex flex-col items-center justify-center">
        {/* Div che contiene l'svg con l'immagine renderizzata in base all'url presente nell'user */}
        <div>
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M197.113 105C198.9 101.906 198.9 98.094 197.113 95L152.887 18.3975C151.1 15.3035 147.799 13.3975 144.226 13.3975H55.7735C52.2008 13.3975 48.8996 15.3035 47.1133 18.3975L2.88675 95C1.10042 98.094 1.10042 101.906 2.88675 105L47.1133 181.603C48.8996 184.697 52.2009 186.603 55.7735 186.603H144.227C147.799 186.603 151.1 184.697 152.887 181.603L197.113 105Z"
              fill="#F5C43D"
            />
            {/* Immagine all'interno dell'esagono */}
            <image
              href={loggedUser.profile_picture} // Usa la prop imageUrl per caricare l'immagine
              width="200" // Larghezza dell'immagine
              height="200" // Altezza dell'immagine
              clipPath="url(#hexClip)" // Applica un ritaglio a forma di esagono
            />

            {/* Clip-path per ritagliare l'immagine a forma di esagono */}
            <defs>
              <clipPath id="hexClip">
                <path d="M197.113 105C198.9 101.906 198.9 98.094 197.113 95L152.887 18.3975C151.1 15.3035 147.799 13.3975 144.226 13.3975H55.7735C52.2008 13.3975 48.8996 15.3035 47.1133 18.3975L2.88675 95C1.10042 98.094 1.10042 101.906 2.88675 105L47.1133 181.603C48.8996 184.697 52.2009 186.603 55.7735 186.603H144.227C147.799 186.603 151.1 184.697 152.887 181.603L197.113 105Z" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-title text-2xl font-bold text-secondary-brand">
            Bio
          </h3>
          <hr className="bg-hr-brand h-1 border-0 rounded-4xl" />
          <InputField
            id={1}
            type={"text"}
            value={loggedUser.bio}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-title text-2xl font-bold text-secondary-brand">
            Email
          </h3>
          <hr className="bg-hr-brand h-1 border-0 rounded-4xl" />
          <InputField
            id={2}
            type={"email"}
            value={loggedUser.email}
            onChange={onChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="font-title text-2xl font-bold text-secondary-brand">
            Language
          </h3>
          <hr className="bg-hr-brand h-1 border-0 rounded-4xl" />
          <InputField
            id={3}
            type={"select"}
            value={
              <ul>
                {userLanguages.map((language) => (
                  <li key={language.id}>{language.name}</li>
                ))}
              </ul>
            } /* Qui dovrà andare il valore delle lingua in qualche modo */
            onChange={onChange}
          />
        </div>
        <div>
          <h3 className="font-title text-2xl font-bold text-secondary-brand">
            My Projects
          </h3>
          <hr className="bg-hr-brand h-1 border-0 rounded-4xl" />
          <ul>{}</ul>
          {/* Mettere un map che recuperi gli user_id da tutte le stories Per poi
          visualizzare solo quelle che corrispondono a quell'user */}
        </div>
      </form>
    </div>
  );
}
