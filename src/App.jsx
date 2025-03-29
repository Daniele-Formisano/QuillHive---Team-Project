import { Routes, Route } from "react-router-dom";
import {
  useGetArtistTypeQuery,
  useGetGenresQuery,
  useGetLanguagesQuery,
} from "./services/apiService";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setGenres,
  setLanguages,
  setUser,
} from "./features/global/globalSlice";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import NewStory_1 from "./pages/NewStory_1";
import NewStory_2 from "./pages/NewStory_2";
import SignupPageForm from "./pages/SignupPageForm";
import SignupPageGenres from "./pages/SignupPageGenres";

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
  });
  useEffect(() => {
    if (dataLanguage) {
      dispatch(setLanguages(dataLanguage));
    }
  });

  if (isLoadingArtist || isLoadingGenres || isLoadingLanguage) {
    // RICORDIAMOCI DI METTERE QUALCOSA DI CARINO PER IL LOADING
    return <div>Loading</div>;
  }
  if (errorArtist || errorGenres || errorLanguage) {
    return <div>error</div>;
  }

  if (localStorage.getItem("user")) {
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
  }

  return (
    dataArtist &&
    dataLanguage &&
    dataGenres && (
      <Routes>
        <Route path="/login" element={<Login languages={dataLanguage} />} />
        <Route path="/signup" element={<SignupPageForm />} />
        <Route
          path="/signupGenres"
          element={<SignupPageGenres genres={dataGenres} />}
        />
        <Route
          path="/NewStory_1"
          element={<NewStory_1 genres={dataGenres} />}
        />
        <Route path="/NewStory_2" element={<NewStory_2 />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
    )
  );
}
