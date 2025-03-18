import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div className="flex flex-col gap-10 p-5 justify-center h-screen">
      <div>
        <h1 className="font-title font-extrabold text-4xl text-secondary-brand text-center">
          Login
        </h1>
      </div>
      <div>
        <LoginForm />

        <div className="flex justify-end">
          <Link
            to={"/forgot-Password"}
            className="text-sm text-[#2B4F76] font-script hover:underline visited:text-secondary-brand mt-3"
          >
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
