import { Link, useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputsValue,
  setAcceptPrivacy,
} from "../features/signup/signupSlice";
import { useLazyGetUsersQuery } from "../services/apiService";
import toast from "react-hot-toast";

export default function SignupPageForm() {
  const navigate = useNavigate();
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
        dispatch(setInputsValue({ field: name, value: value }));

        break;

      case "policy":
        dispatch(setAcceptPrivacy(!formValues.acceptPrivacy));

        break;
    }
  }

  // funzione per la funzione handleBlur per eseguire requestAPI per verifica valori già presenti nel db json
  async function checkValue(name, messageError) {
    const response = await triggerGetUser({
      [name]: formValues[name].trim(),
    });

    if (response.data.length) {
      toast.error(messageError);
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
  function handleSubmit(e) {
    e.preventDefault();

    //navigate("/signupGenres"); // attualmente disabilitato per evitare redirect
  }

  return (
    <div className="flex flex-col gap-10 p-8 bg-bg-brand min-h-screen justify-center">
      <div>
        <h1 className="font-title text-4xl text-secondary-brand text-center">
          Signup
        </h1>
      </div>

      <div className="flex flex-col gap-7">
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
      </div>
    </div>
  );
}
