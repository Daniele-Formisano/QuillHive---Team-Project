import { useEffect, useState } from "react";
import SignupPageForm from "./SignupPageForm";
import SignupPageGenres from "./SignupPageGenres";
import SignupPageArtistTypes from "./SignupPageArtistTypes";
import { useNavigate } from "react-router-dom";
import {
  useAddUserArtistTypesMutation,
  useAddUserGenresMutation,
  useAddUsersMutation,
  useLazyGetUserArtistTypesQuery,
  useLazyGetUserGenresQuery,
  useLazyGetUsersQuery,
} from "../services/apiService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function SignupPages({ genres, artistTypes }) {
  const [stepSignup, setStepSingup] = useState(1);
  const [triggerGetUser] = useLazyGetUsersQuery();
  const [triggerGetUserGenres] = useLazyGetUserGenresQuery();
  const [triggerUserArtistTypes] = useLazyGetUserArtistTypesQuery();
  const [addUsers] = useAddUsersMutation();
  const [addUserGenres] = useAddUserGenresMutation();
  const [AddUserArtistTypes] = useAddUserArtistTypesMutation();
  const formValues = useSelector((state) => state.signup);
  const navigate = useNavigate();

  function nextPage(page) {
    setStepSingup(page);
  }

  async function submitData() {
    const responseUsers = await triggerGetUser();

    if (responseUsers.error) {
      console.error("Error: ", responseUsers.error);
      toast.error("An error occurred, please retry later");
      return;
    }

    const userId = responseUsers.data.length + 1;

    const newUser = {
      id: String(userId),
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      profile_picture: null,
      bio: null,
      account_created_at: new Date(),
      pronouns: formValues.pronouns.length ? formValues.pronouns[0] : null,
    };

    toast.promise(
      async () => {
        try {
          //invio dei dati al db dell'user
          await addUsers(newUser).unwrap();

          //invio dei dati dei generi selezionati dall'utente nel db
          const userGenres = await triggerGetUserGenres().unwrap();

          let userGenresId = userGenres.length + 1;

          for (const genre of formValues.selectedGenres) {
            const userGenre = {
              id: String(userGenresId++),
              userId: String(userId),
              genreId: String(genre),
            };

            await addUserGenres(userGenre).unwrap();
          }

          //invio dei dati dei tipi d'artista selezionati dall'utente
          if (formValues.selectedArtistTypes.length) {
            const userArtistTypes = await triggerUserArtistTypes().unwrap();

            let userArtistTypesId = userArtistTypes.length + 1;

            for (const artistType of formValues.selectedArtistTypes) {
              const userArtistType = {
                id: String(userArtistTypesId++),
                userId: String(userId),
                artist_typeId: String(artistType),
              };

              await AddUserArtistTypes(userArtistType);
            }
          }
        } catch (error) {
          throw new Error("Signup failed, please retry");
        }
      },
      {
        loading: "Loading...",
        success: "Signup Successfully, Welcome in QuillHive",
        error: (err) => <b>{err.message || "Error"}</b>,
      }
    );
  }

  useEffect(() => {
    //console.log(stepSignup);

    if (stepSignup > 3) {
      submitData();
      navigate("/home");
      setStepSingup(1);
    }
  }, [stepSignup]);

  if (stepSignup === 1) {
    return <SignupPageForm nextPage={nextPage} />;
  }

  if (stepSignup === 2) {
    return <SignupPageGenres genres={genres} nextPage={nextPage} />;
  }

  if (stepSignup === 3) {
    return (
      <SignupPageArtistTypes artistTypes={artistTypes} nextPage={nextPage} />
    );
  }
}
