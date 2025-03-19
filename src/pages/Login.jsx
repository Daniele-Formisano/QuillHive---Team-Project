import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetUsersQuery } from "../services/apiService";
import { useDispatch } from "react-redux";
import { setUser } from "../features/global/globalSlice";

export default function Login() {
  const [inputsValue, setinputsValue] = useState({
    email: "",
    password: "",
  });

  //stato per evitare di effettuare chiamate al db senza motivo
  const [isLogging, setIsLogging] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useGetUsersQuery(inputsValue, {
    skip: !isLogging,
  });

  useEffect(() => {
    console.log(data);
    setIsLogging(false);

    if (data?.length) {
      dispatch(setUser(data)); // impostare l'utente nel redux
      navigate("/editProfile");
    } else {
      toast.error("invalid email or password");
    }
  }, [data]);

  //funzione per modifcare lo stato che controlla gli inputs del form
  function handleChange(e) {
    const { name, value } = e.target;
    setinputsValue((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  }

  // funzione per inviare il form
  function handleSubmit(e) {
    e.preventDefault();
    if (inputsValue.email.trim() == "" || inputsValue.password.trim() == "") {
      toast.error("fill in all fields");
      return;
    }

    setIsLogging(true);
  }

  return (
    <div className="flex flex-col gap-10 p-5 justify-center h-screen bg-[#FFFCF5]">
      <div>
        <h1 className="font-title text-4xl text-secondary-brand text-center">
          Login
        </h1>
      </div>

      <div className="flex flex-col gap-7">
        <LoginForm
          onSubmit={(e) => handleSubmit(e)}
          onChange={(e) => handleChange(e)}
          inputsValue={inputsValue}
        />

        <p className="font-script text-center">
          Not a member?{" "}
          <Link className="text-[#2B4F76] hover:underline visited:text-secondary-brand">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}
