import { useNavigate } from "react-router-dom";
import HamburgerMenu from "./HamburgherMenu";
import ProfileIcon from "./ProfileIcon";
import Searchbar from "./Searchbar";

export default function HeaderNavbar({ user }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 flex flex-row justify-around items-center bg-bg-brand z-45 py-2">
      <HamburgerMenu />

      <Searchbar />
      <div className="flex justify-center items-center">
        <ProfileIcon
          width={"w-[55px]"}
          height={"h-[55px]"}
          user={user}
          onClick={() =>
            user ? navigate(`/profile/${user.id}`) : navigate("/login")
          }
        />
      </div>
    </header>
  );
}
