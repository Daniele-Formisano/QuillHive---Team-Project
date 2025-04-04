import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  pronouns: [],
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

    togglePronouns: (state, action) => {
      if (action.payload !== undefined) {
        state.pronouns = [action.payload];
        return;
      }

      state.pronouns = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleGenre,
  setInputsValue,
  setAcceptPrivacy,
  toggleArtistType,
  togglePronouns,
} = signupSlice.actions;

export default signupSlice.reducer;
