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
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import Loader from "./components/Loader";
import SignupPages from "./pages/SignupPages";
/*
import NewStory_1 from "./pages/NewStory_1";
import NewStory_2_list from "./pages/NewStory_2_list";
import NewStory_2_item from "./pages/NewStory_2_item";

import Home from "./pages/Home";
import UserLibrary from "./pages/UserLibrary";

import ProfilePages from "./pages/ProfilePages";
import StoryInfoPage from "./pages/StoryInfoPage";
import ReadingPage from "./pages/ReadingPage";
*/

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
      const { genres } = dataGenres;
      dispatch(setGenres(genres));
    }

    if (dataLanguage) {
      const { languages } = dataLanguage;
      dispatch(setLanguages(languages));
    }

    if (dataArtist) {
      const { artistTypes } = dataArtist;
      dispatch(setArtistTypes(artistTypes));
    }
  });
  useEffect(() => {
    if (dataStories) {
      const { stories } = dataStories;
      dispatch(setStories(stories));
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
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPages />} />
        {/*
        <Route path="/home" element={<Home />}></Route>

        { CREAZIONE E MODIFICA STORIA }
        <Route
          path="/stories/create"
          element={<NewStory_1 genres={dataGenres} />}
        />

        <Route
          path="story/:id/info"
          element={<StoryInfoPage stories={dataStories} />}
        />
        <Route
          path="story/:storyId/read-story/chapter/:chapterOrder"
          element={<ReadingPage />}
        />
        <Route
          path="/stories/:storyId/chapters"
          element={<NewStory_2_list />}
        />
        <Route
          path="/stories/:storyId/chapters/:chapterId"
          element={<NewStory_2_item />}
        />

        <Route path="/profile/:id" element={<ProfilePages />} />
        <Route path="story/:id/info" element={<StoryInfoPage />} />
        <Route path="/library" element={<UserLibrary />} /> */}
      </Routes>
    )
  );
}
