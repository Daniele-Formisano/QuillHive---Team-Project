import { Link, useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import {
  setInputsValue,
  setAcceptPrivacy,
} from "../features/signup/signupSlice";

export default function SignupPageForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formValues = useSelector((state) => state.signup);

  function handleChange(e) {
    const { name, value } = e.target;
    if (
      name === "email" ||
      name === "username" ||
      name === "password" ||
      name === "confirmPassword"
    ) {
      dispatch(setInputsValue({ field: name, value: value }));
    } else if (name === "policy") {
      dispatch(setAcceptPrivacy(!formValues.acceptPrivacy));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    //navigate("/signupGenres");
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
