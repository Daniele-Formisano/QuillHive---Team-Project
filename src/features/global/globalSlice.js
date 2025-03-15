import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  languages: [],
  selectedGenres: [],
  selectedArtistType: [],
  genres: [],
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
    setArtistType: (state, action) => {
      state.selectedArtistType = action.payload;
    },
    toggleGenre: (state, action) => {
      state.selectedGenres = state.selectedGenres.includes(action.payload)
        ? state.selectedGenres.filter((genreId) => genreId !== action.payload)
        : [...state.selectedGenres, action.payload];
    },
    toggleArtistType: (state, action) => {
      state.selectedArtistType = state.selectedArtistType.includes(
        action.payload
      )
        ? state.selectedArtistType.filter((typeId) => typeId !== action.payload)
        : [...state.selectedArtistType, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUser,
  setLanguages,
  toggleGenre,
  toggleArtistType,
  setGenres,
  setArtistType,
} = globalSlice.actions;

export default globalSlice.reducer;
