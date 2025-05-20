import { useEffect, useState } from "react";
import SignupPageForm from "./SignupPageForm";
import SignupPageGenres from "./SignupPageGenres";
import SignupPageArtistTypes from "./SignupPageArtistTypes";
import { useNavigate } from "react-router-dom";
import {
  useAddUsersMutation,
  useLoginMutation,
  useLazyGetUserByIdQuery,
} from "../services/apiService";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../features/global/globalSlice";

export default function SignupPages() {
  const [stepSignup, setStepSingup] = useState(1);
  const [addUsers] = useAddUsersMutation();
  const [login] = useLoginMutation();
  const [triggerGetUserById] = useLazyGetUserByIdQuery();
  const formValues = useSelector((state) => state.signup);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function nextPage(page) {
    setStepSingup(page);
  }

  // funzione per l'invio di dati del nuovo utente
  async function submitData() {
    const newUser = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      pronouns: formValues.pronouns.length ? formValues.pronouns[0] : null,
      genres: formValues.selectedGenres,
      artistTypes: formValues.selectedArtistTypes,
    };

    toast.promise(
      async () => {
        try {
          //invio dei dati utente
          await addUsers(newUser).unwrap();

          //login dell'utente dopo la registrazione
          const response = await login({
            usernameOrEmail: newUser.email,
            password: newUser.password,
          }).unwrap();

          const { token, user } = response;

          const userData = await triggerGetUserById(user.id).unwrap();

          console.log(userData);

          dispatch(setUser(userData)); // impostare l'utente nel redux
          localStorage.setItem("user", JSON.stringify(userData)); // salva l'utente nel local storage
          localStorage.setItem("token", JSON.stringify(token));
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      {
        loading: "Loading...",
        success: `Signup Successfully, Welcome in QuillHive ${formValues.username}`,
        error: (error) => error?.data?.error || "Error",
      }
    );
  }

  useEffect(() => {
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
    return <SignupPageGenres nextPage={nextPage} />;
  }

  if (stepSignup === 3) {
    return <SignupPageArtistTypes nextPage={nextPage} />;
  }
}
