import { Routes, Route } from "react-router-dom";
import {
  useGetArtistTypeQuery,
  useGetGenresQuery,
  useGetLanguagesQuery,
} from "./services/apiService";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setArtistTypes,
  setGenres,
  setLanguages,
} from "./features/global/globalSlice";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import SignupPageForm from "./pages/SignupPageForm";
import SignupPageArtistTypes from "./pages/SignupPageArtistTypes";
import SignupPages from "./pages/SignupPages";

export default function App() {
  const {
    data: dataArtist,
    isLoading: isLoadingArtist,
    error: errorArtist,
  } = useGetArtistTypeQuery();
  const {
    data: dataLanguage,
    isLoading: isLoadingLanguage,
    error: errorLanguage,
  } = useGetLanguagesQuery();
  const {
    data: dataGenres,
    isLoading: isLoadingGenres,
    error: errorGenres,
  } = useGetGenresQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (dataGenres) {
      dispatch(setGenres(dataGenres));
    }

    if (dataLanguage) {
      dispatch(setLanguages(dataLanguage));
    }

    if (dataArtist) {
      dispatch(setArtistTypes(dataArtist));
    }
  });

  if (isLoadingArtist || isLoadingGenres || isLoadingLanguage) {
    return <div>Loading</div>;
  }
  if (errorArtist || errorGenres || errorLanguage) {
    return <div>error</div>;
  }

  return (
    dataArtist &&
    dataLanguage &&
    dataGenres && (
      <Routes>
        <Route path="/login" element={<Login languages={dataLanguage} />} />
        <Route
          path="/signup"
          element={<SignupPages genres={dataGenres} artistTypes={dataArtist} />}
        />
        <Route path="/signupArtistTypes" element={<SignupPageArtistTypes />} />
        {/* <Route path="/NewStory_1" element={<SelectGenres genres={genres} />} /> */}
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
    )
  );
}
