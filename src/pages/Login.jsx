import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Button from "../components/Button";
import { useState } from "react";

export default function Login() {
  const [inputValue, setInputValue] = useState({
    inptEmailValue: "",
    inputPasswordValue: "",
  });

  return (
    <div className="flex flex-col gap-10 p-5 justify-center h-screen bg-[#FFFCF5]">
      <div>
        <h1 className="font-title text-4xl text-secondary-brand text-center">
          Login
        </h1>
      </div>
      <div className="flex flex-col gap-17">
        <div>
          <LoginForm />

          <div className="flex justify-end ">
            <Link
              to={"/forgot-Password"}
              className="text-sm text-[#2B4F76] font-script hover:underline visited:text-secondary-brand mt-2"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Button iscolorYellow={true}>Login</Button>
        </div>
      </div>
    </div>
  );
}
