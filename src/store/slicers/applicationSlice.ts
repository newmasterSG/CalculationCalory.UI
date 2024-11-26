import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../mainStore";
import { ThemeState } from "../../types/types";

interface AppState {
  colorMode: ThemeState;
}

const initialState: AppState = {
  colorMode: "light",
};

const applicationSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setColorMode(state, action: PayloadAction<ThemeState>) {
      state.colorMode = action.payload;
    },
  },
});

export const { setColorMode } = applicationSlice.actions;

export const getColorMode = (state: RootState) => {
  return state.app.colorMode;
};

export default applicationSlice.reducer;
