import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  pronouns: null,
  acceptPrivacy: false,
  selectedGenres: [],
  selectedArtistTypes: [],
};

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setInputsValue: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },

    setAcceptPrivacy: (state, action) => {
      state.acceptPrivacy = action.payload;
    },

    toggleGenre: (state, action) => {
      state.selectedGenres = state.selectedGenres.includes(action.payload)
        ? state.selectedGenres.filter((genreId) => genreId !== action.payload)
        : [...state.selectedGenres, action.payload];
    },

    toggleArtistType: (state, action) => {
      state.selectedArtistTypes = state.selectedArtistTypes.includes(
        action.payload
      )
        ? state.selectedArtistTypes.filter(
            (artistTypeId) => artistTypeId !== action.payload
          )
        : [...state.selectedArtistTypes, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleGenre,
  setInputsValue,
  setAcceptPrivacy,
  toggleArtistType,
} = signupSlice.actions;

export default signupSlice.reducer;
