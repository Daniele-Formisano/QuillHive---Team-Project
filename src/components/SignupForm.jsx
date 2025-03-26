import { Link } from "react-router-dom";
import Checkbox from "./Checkbox";
import InputField from "./InputField";
import Button from "./Button";

export default function SignupForm({ onSubmit, formValues, onChange, onBlur }) {
  return (
    <div>
      <form action="" className="flex flex-col gap-8" onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <InputField
            label={"E-mail"}
            id={"email"}
            type={"email"}
            placeholder={"E-mail"}
            name={"email"}
            value={formValues.email}
            onChange={onChange}
            onBlur={onBlur}
            required
          />
          <InputField
            label={"Username"}
            id={"username"}
            type={"text"}
            placeholder={"Enter a username"}
            name={"username"}
            value={formValues.username}
            onChange={onChange}
            onBlur={onBlur}
            required
          />
          <InputField
            label={"Password"}
            id={"password"}
            type={"password"}
            placeholder={"Enter a password"}
            name={"password"}
            autoComplete={"new-password"}
            value={formValues.password}
            onChange={onChange}
            required
          />
          <InputField
            label={"Confirm password"}
            id={"confirm-password"}
            type={"password"}
            placeholder={"Confirm pasword"}
            name={"confirmPassword"}
            autoComplete={"new-password"}
            value={formValues.confirmPassword}
            onChange={onChange}
            required
          />

          {/* DA SOSTITUIRE CON LA SELECT */}
          <InputField
            label={"ciao"}
            id={"null"}
            type={"password"}
            placeholder={"Confirm pasword"}
            autoComplete={"new-password"}
          />
        </div>

        <div className="flex flex-col gap-15">
          <Checkbox
            id={"policy"}
            name={"policy"}
            checked={formValues.acceptPrivacy}
            onChange={onChange}
          >
            I have read and accept the{" "}
            <Link className="font-script-bold text-[#2B4F76] hover:underline visited:text-fuchsia-900">
              Terms and Conditions
            </Link>{" "}
            and the{" "}
            <Link className="font-script-bold text-[#2B4F76] hover:underline visited:text-fuchsia-900">
              Privacy Policy
            </Link>{" "}
            of <span className="font-script-bold">Quill Hive.</span>
          </Checkbox>

          <Button isColorYellow={true} type={"submit"}>
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
}
