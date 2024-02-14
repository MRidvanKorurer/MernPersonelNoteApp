import { configureStore } from "@reduxjs/toolkit";
import { noteReducer } from "./noteSlice";
import { modelReducer } from "./modelSlice";
import { authReducer } from "./authSlice";

export const store = configureStore({
  reducer: {
    note: noteReducer,
    model: modelReducer,
    auth: authReducer
  },
});
