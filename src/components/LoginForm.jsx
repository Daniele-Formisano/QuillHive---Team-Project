import InputField from "./InputField";

export default function LoginForm() {
  return (
    <div>
      <form action="">
        <InputField
          label={"E-mail or Username"}
          id={"mail"}
          type={"text"}
          placeholder={"Email or Username..."}
        />
        <InputField
          label={"Password"}
          id={"password"}
          type={"password"}
          placeholder={"Password"}
        />
      </form>
    </div>
  );
}
