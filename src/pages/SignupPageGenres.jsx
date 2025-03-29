import { useDispatch, useSelector } from "react-redux";
import GenreList from "../components/GenresList";
import { toggleGenre } from "../features/signup/signupSlice";
import toast from "react-hot-toast";
import Button from "../components/Button";

export default function SignupPageGenres({ genres, nextPage }) {
  const { selectedGenres } = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  function toggleGenreAction(id) {
    // avvisiamo l'utente che non può selezionare più di 5 generi, permettiamo di deselezionare i generi anche quando sono 5
    if (selectedGenres.length >= 5 && !selectedGenres.includes(id)) {
      toast.error("You can't select more than 5 genres");
      return;
    }

    dispatch(toggleGenre(id));
  }

  function handleClick() {
    if (!selectedGenres.length) {
      toast.error("You must select at least one favorite genre");
      return;
    }

    nextPage();
  }

  return (
    <div className="flex flex-col gap-10 p-8 min-h-screen bg-bg-brand justify-center">
      <div className="flex flex-col gap-4">
        <h1 className="font-title text-3xl text-secondary-brand">
          Customize your experience
        </h1>

        <h3 className="font-script text-sm text-secondary-brand">
          Select your favorite genres, min. 1 - max. 5, to get started.
        </h3>
      </div>

      <div>
        <GenreList
          list={genres}
          selected={selectedGenres}
          toggleGenre={toggleGenreAction}
        />
      </div>

      <div>
        <Button isColorYellow={true} type={"button"} onClick={handleClick}>
          Continue
        </Button>
      </div>
    </div>
  );
}
