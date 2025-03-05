import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../features/global/globalSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
