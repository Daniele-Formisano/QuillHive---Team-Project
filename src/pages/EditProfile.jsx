import { useDispatch, useSelector } from "react-redux";
import UserForm from "../components/UserForm";
import { setUser } from "../features/global/globalSlice";

export default function EditProfile({ languages }) {
  const user = useSelector((state) => state.global.user);
  console.log(user);
  return (
    <div>
      <nav>
        {/*
         Qui andrà il button indietro + quello di logout
         */}
      </nav>
      <section>
        <UserForm loggedUser={user} languages={languages} />
      </section>
    </div>
  );
}
