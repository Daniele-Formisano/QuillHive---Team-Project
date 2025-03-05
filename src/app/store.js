import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../features/global/globalSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
