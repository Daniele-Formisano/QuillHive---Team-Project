import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./Root.jsx";
import InputField from "./components/InputField.jsx";
import SaveButton from "./components/ButtonSave.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SaveButton />
  </StrictMode>
);
