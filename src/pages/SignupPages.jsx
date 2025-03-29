import { useEffect, useState } from "react";
import SignupPageForm from "./SignupPageForm";
import SignupPageGenres from "./SignupPageGenres";
import SignupPageArtistTypes from "./SignupPageArtistTypes";
import { useNavigate } from "react-router-dom";

export default function SignupPages({ genres, artistTypes }) {
  const [stepSignup, setStepSingup] = useState(1);
  const navigate = useNavigate();

  function nextPage() {
    setStepSingup(stepSignup + 1);
  }

  useEffect(() => {
    console.log(stepSignup);

    if (stepSignup > 3) {
      //navigate("");
      setStepSingup(1);
    }
  }, [stepSignup]);

  if (stepSignup === 1) {
    return <SignupPageForm nextPage={nextPage} />;
  }

  if (stepSignup === 2) {
    return <SignupPageGenres genres={genres} nextPage={nextPage} />;
  }

  if (stepSignup === 3) {
    return (
      <SignupPageArtistTypes artistTypes={artistTypes} nextPage={nextPage} />
    );
  }
}
