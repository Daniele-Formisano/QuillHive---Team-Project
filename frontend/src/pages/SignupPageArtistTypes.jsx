import { useDispatch, useSelector } from "react-redux";
import ArtistTypesList from "../components/ArtistTypesList";
import { toggleArtistType } from "../features/signup/signupSlice";
import Button from "../components/Button";
import toast from "react-hot-toast";
import BackButton from "../components/BackButton";

export default function SignupPageArtistTypes({ artistTypes, nextPage }) {
  const { selectedArtistTypes } = useSelector((state) => state.signup);
  const dispatch = useDispatch();

  function toggleArtistTypeAction(id) {
    if (selectedArtistTypes.length >= 2 && !selectedArtistTypes.includes(id)) {
      toast.error("You can't select more than 2 artist types");
      return;
    }

    dispatch(toggleArtistType(id));
  }

  function handleClick() {
    nextPage(4);
  }

  return (
    <div className="bg-bg-brand min-h-screen relative">
      <div className="mt-2 absolute">
        <BackButton onClick={() => nextPage(2)} />
      </div>
      <div className="flex flex-col gap-10 p-8 min-h-screen justify-center">
        <div className="flex flex-col gap-4">
          <h1 className="font-title text-3xl text-secondary-brand">
            Wich artist hides within you?
          </h1>

          <h3 className="font-script text-sm text-secondary-brand">
            Select up to 2 creative roles that describe yourself, or just
            continue as a reader.
          </h3>
        </div>

        <div>
          <ArtistTypesList
            artistTypes={artistTypes}
            selected={selectedArtistTypes}
            toggleArtistType={toggleArtistTypeAction}
          />
        </div>

        <div className="flex flex-col gap-5">
          <Button type={"button"} isColorYellow={true} onClick={handleClick}>
            Continue
          </Button>
          <Button type={"button"} isColorYellow={false} onClick={handleClick}>
            Explore as a Reader
          </Button>
        </div>
      </div>
    </div>
  );
}
