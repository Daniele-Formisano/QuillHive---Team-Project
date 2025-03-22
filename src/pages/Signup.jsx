import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";

export default function Signup() {
  return (
    <div className="flex flex-col gap-10 p-8 h-screen bg-bg-brand justify-center">
      <div>
        <h1 className="font-title text-4xl text-secondary-brand text-center">
          Signup
        </h1>
      </div>

      <div className="flex flex-col gap-7">
        <SignupForm />

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
