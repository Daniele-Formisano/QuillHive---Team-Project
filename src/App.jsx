import React from "react";
import InputField from "./InputField"; // Assicurati che il percorso sia corretto

export function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <InputField
        label="E-mail or username"
        id="username"
        type="text"
        placeholder="E-mail or username"
      />
      <InputField
        label="Password"
        id="password"
        type="password"
        placeholder="Password"
      />
    </div>
  );
}

export default App;
