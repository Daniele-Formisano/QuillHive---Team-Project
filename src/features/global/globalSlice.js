import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  languages: [],
  selectedGenres: [],
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
    toggleGenre: (state, action) => {
      state.selectedGenres = state.selectedGenres.includes(action.payload)
        ? state.selectedGenres.filter((genreId) => genreId !== action.payload)
        : [...state.selectedGenres, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setLanguages, toggleGenre } = globalSlice.actions;

export default globalSlice.reducer;
