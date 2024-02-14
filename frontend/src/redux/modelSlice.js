import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openModel: false,
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    modelTrue: (state, actions) => {
      state.openModel = true;
    },
    modelFalse: (state, actions) => {
      state.openModel = false;
    },
  },
});

export const { modelTrue, modelFalse } = modelSlice.actions;
export const modelReducer = modelSlice.reducer;
