import { useSelector } from "react-redux";
import { useGetUserLanguagesQuery } from "../services/apiService";

// Un hook per ottenere il nome delle lingue dell'utente loggato
export const useUserLanguages = () => {
  const user = useSelector((state) => state.global.user); // Prende l'utente loggato
  const languages = useSelector((state) => state.global.languages);
  const { data: userLanguages } = useGetUserLanguagesQuery(user?.id, {
    skip: !user,
  }); // Prendi solo le lingue dell'utente

  if (!user || !languages || !userLanguages) return [];

  return userLanguages.map((ul) => {
    return languages.find((lang) => lang.id === ul.languageId);
  });
};
