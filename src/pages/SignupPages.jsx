import { useState } from "react";
import SignupPageForm from "./SignupPageForm";
import SignupPageGenres from "./SignupPageGenres";
import SignupPageArtistTypes from "./SignupPageArtistTypes";

export default function SignupPages({ genres, artistTypes }) {
  const [stepSignup, setStepSingup] = useState(1);

  function nextPage() {
    setStepSingup(stepSignup + 1);

    if (stepSignup > 3) {
      setStepSingup(1);
    }
  }

  if (stepSignup === 1) {
    return <SignupPageForm nextPage={nextPage} />;
  }

  if (stepSignup === 2) {
    return <SignupPageGenres genres={genres} nextPage={nextPage} />;
  }

  if (stepSignup === 3) {
    return <SignupPageArtistTypes artistTypes={artistTypes} />;
  }
}
