import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  languages: [],
  selectedGenres: [],
  artistTypes: [],
  genres: [],
  stories: [],
  storyGenres: [],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setArtistTypes: (state, action) => {
      state.artistTypes = action.payload;
    },
    setStories: (state, action) => {
      state.stories = action.payload;
    },
    setStoryGenres: (state, action) => {
      state.storyGenres = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setLanguages,
  setGenres,
  setArtistTypes,
  setStoryGenres,
  setStories,
} = globalSlice.actions;

export default globalSlice.reducer;
