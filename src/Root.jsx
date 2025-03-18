import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";
import App from "./App";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";

export default function Root() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Toaster />
        <Login />
      </Provider>
    </BrowserRouter>
  );
}
