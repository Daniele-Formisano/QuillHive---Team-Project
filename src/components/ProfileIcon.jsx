import { useSelector } from "react-redux";

export default function ProfileIcon({ onClick, width, height }) {
  const loggedUser = useSelector((state) => state.global.user);
  const profileImage = loggedUser?.profile_picture || "/default-profile.png";
  //se logged user è null or undefined vai su default 
  return (
    <button onClick={onClick}>
      <svg
        width={width}
        height={height}
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
           href={profileImage} // Usa la prop imageUrl per caricare l'immagine
          width={width} // Larghezza dell'immagine
          height={height} // Altezza dell'immagine
          clipPath="url(#hexClip)" // Applica un ritaglio a forma di esagono
        />

        {/* Clip-path per ritagliare l'immagine a forma di esagono */}
        <defs>
          <clipPath id="hexClip">
            <path d="M197.113 105C198.9 101.906 198.9 98.094 197.113 95L152.887 18.3975C151.1 15.3035 147.799 13.3975 144.226 13.3975H55.7735C52.2008 13.3975 48.8996 15.3035 47.1133 18.3975L2.88675 95C1.10042 98.094 1.10042 101.906 2.88675 105L47.1133 181.603C48.8996 184.697 52.2009 186.603 55.7735 186.603H144.227C147.799 186.603 151.1 184.697 152.887 181.603L197.113 105Z" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}
