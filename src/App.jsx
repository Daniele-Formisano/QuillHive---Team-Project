import { Routes, Route } from "react-router-dom";
import {
  useGetArtistTypeQuery,
  useGetGenresQuery,
  useGetStoriesQuery,
  useGetLanguagesQuery,
} from "./services/apiService";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setGenres,
  setStories,
  setLanguages,
  setUser,
  setArtistTypes,
} from "./features/global/globalSlice";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import NewStory_1 from "./pages/NewStory_1";
import NewStory_2 from "./pages/NewStory_2";
import SignupPages from "./pages/SignupPages";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import BookModal from "./components/BookModal";
import Navbar from "./components/navbar";

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
  const {
    data: dataStories,
    isLoading: isLoadingStories,
    error: errorStories,
  } = useGetStoriesQuery();

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
  useEffect(() => {
    if (dataStories) {
      dispatch(setStories(dataStories));
    }
  });

  if (
    isLoadingArtist ||
    isLoadingGenres ||
    isLoadingStories ||
    isLoadingLanguage
  ) {
    // RICORDIAMOCI DI METTERE QUALCOSA DI CARINO PER IL LOADING
    return (
      <div>
        <Loader />
      </div>
    );
  }
  if (errorArtist || errorGenres || errorStories || errorLanguage) {
    return <div>error</div>;
  }

  if (localStorage.getItem("user")) {
    dispatch(setUser(JSON.parse(localStorage.getItem("user"))));
  }

  return (
    dataArtist &&
    dataLanguage &&
    dataGenres &&
    dataStories && (
      <Routes>
        <Route path="/login" element={<Login languages={dataLanguage} />} />
        <Route
          path="/signup"
          element={<SignupPages genres={dataGenres} artistTypes={dataArtist} />}
        />
        <Route path="/home" element={<Home />}></Route>
        <Route
          path="story/create"
          element={<NewStory_1 genres={dataGenres} />}
        />
        <Route path="story/:id/edit" element={<NewStory_2 />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Routes>
    )
  );
}
