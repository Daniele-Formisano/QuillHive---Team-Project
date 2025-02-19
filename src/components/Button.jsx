export default function Button({ bg, textType, hover }) {
  const buttonType = {
    signup: "Signup",
    login: "Login",
    startReading: "Start reading as Guest",
  };

  function handleButtonClick() {}

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className={`w-[320px] h-[40px] px-4 rounded-[50px] brand-blue-text font-semibold ${bg} text-center ${hover} cursor-pointer`}
      >
        {buttonType[textType]}
      </button>
    </div>
  );
}
