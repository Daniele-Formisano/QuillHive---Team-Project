import InputField from "./InputField";

export default function LoginForm({ inputValue, onChange }) {
  return (
    <div>
      <form action="" className="flex flex-col gap-5">
        <InputField
          label={"E-mail or Username"}
          id={"mail"}
          type={"text"}
          placeholder={"Email or Username..."}
          value={inputValue}
          onChange={onChange}
        />
        <InputField
          label={"Password"}
          id={"password"}
          type={"password"}
          placeholder={"Password"}
          value={inputValue}
          onChange={onChange}
        />
      </form>
    </div>
  );
}
