import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../features/global/globalSlice";
import signupReducer from "../features/signup/signupSlice";
import { apiService } from "../services/apiService";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    signup: signupReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
