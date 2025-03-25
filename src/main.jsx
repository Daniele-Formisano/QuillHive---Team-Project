import { createRoot } from "react-dom/client";
import "./index.css";
import Root from "./Root.jsx";
import UserForm from "./components/UserForm.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<Root />);
