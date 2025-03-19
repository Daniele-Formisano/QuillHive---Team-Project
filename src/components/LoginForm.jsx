import { Link } from "react-router-dom";
import Button from "./Button";
import InputField from "./InputField";

export default function LoginForm({ inputsValue, onChange, onSubmit }) {
  return (
    <div className="flex flex-col">
      <form action="" className="flex flex-col gap-2" onSubmit={onSubmit}>
        <div className="flex flex-col gap-5">
          <InputField
            label={"E-mail or Username"}
            id={"email"}
            type={"text"}
            placeholder={"Email or Username..."}
            value={inputsValue.email}
            onChange={onChange}
            name={"email"}
          />
          <InputField
            label={"Password"}
            id={"password"}
            type={"password"}
            placeholder={"Password"}
            value={inputsValue.password}
            onChange={onChange}
            name={"password"}
          />
        </div>
        <div className=" flex flex-col gap-17">
          <div className="flex justify-end">
            <Link
              to={"/forgot-Password"}
              className="text-sm text-[#2B4F76] font-script hover:underline visited:text-secondary-brand"
            >
              Forgot password?
            </Link>
          </div>

          <Button isColorYellow={true} type={"submit"}>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}
