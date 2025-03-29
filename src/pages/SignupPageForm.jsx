import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputsValue,
  setAcceptPrivacy,
} from "../features/signup/signupSlice";
import { useLazyGetUsersQuery } from "../services/apiService";
import toast from "react-hot-toast";
import BackButton from "../components/BackButton";

export default function SignupPageForm({ nextPage }) {
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.signup);
  const [triggerGetUser] = useLazyGetUsersQuery();

  // funzione per settare i valori e cambiamenti dei campi del form nel redux in tempo reale
  function handleChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case "email":
      case "username":
      case "password":
      case "confirmPassword":
        if (value.includes(" ")) {
          toast.error("This field only accepts characters without spaces");
        }

        dispatch(setInputsValue({ field: name, value: value.trim() }));

        break;

      case "policy":
        dispatch(setAcceptPrivacy(!formValues.acceptPrivacy));

        break;
    }
  }

  // funzione per eseguire requestAPI per verifica valori già presenti nel db json
  async function checkValue(name, messageError) {
    const response = await triggerGetUser({
      [name]: formValues[name].trim(),
    });

    if (response.data.length) {
      toast.error(messageError);
      return false;
    } else {
      return true;
    }
  }

  // funzione per verificare che dopo essere uscito da un campo che si presuppone unique richiama la funzione checkValue
  function handleBlur(e) {
    const { name, value } = e.target;

    if (value.trim() !== "") {
      switch (name) {
        case "email":
          checkValue(
            name,
            "This email is already associated with another account"
          );
          break;

        case "username":
          checkValue(
            name,
            "This username is already used, please choose another one"
          );
          break;
      }
    }
  }

  // funzione per l'invio del form
  async function handleSubmit(e) {
    e.preventDefault();

    // controllo se non è stata accettata la privacy
    if (!formValues.acceptPrivacy) {
      toast.error(
        "plese read and accept the terms and conditions of QuillHive to continue"
      );
      return;
    }

    // controllo se ci sono email e password già
    const checkMail = await checkValue(
      "email",
      "This email is already associated with another account"
    );

    const checkUsername = await checkValue(
      "username",
      "This username is already used, please choose another one"
    );

    if (!checkMail || !checkUsername) return;

    if (formValues.password !== formValues.confirmPassword) {
      toast.error("The password and confirmation password do not match");
    }

    nextPage(2);
  }

  return (
    <div className="bg-bg-brand min-h-screen relative">
      <div className="mt-2 absolute">
        <BackButton pageURL={"/"} />
      </div>

      <div className="flex flex-col gap-10 p-8 min-h-screen justify-center">
        <header>
          <h1 className="font-title text-4xl text-secondary-brand text-center">
            Signup
          </h1>
        </header>

        <main className="flex flex-col gap-7">
          <SignupForm
            onSubmit={handleSubmit}
            onChange={handleChange}
            formValues={formValues}
            onBlur={handleBlur}
          />

          <p className="text-center font-script text-input-text-brand">
            Already a member?{" "}
            <Link
              to={"/login"}
              className="text-[#2B4F76] hover:underline visited:text-fuchsia-900"
            >
              Login now
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
