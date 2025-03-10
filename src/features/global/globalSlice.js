import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action) => {
      {
        state.user = action.payload;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = globalSlice.actions;

export default globalSlice.reducer;
