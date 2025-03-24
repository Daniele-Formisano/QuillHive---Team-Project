import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  pronouns: null,
  acceptPrivacy: false,
  selectedGenres: [],
  selectedArtistsType: [],
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
  },
});

// Action creators are generated for each case reducer function
export const { toggleGenre, setInputsValue, setAcceptPrivacy } =
  signupSlice.actions;

export default signupSlice.reducer;
