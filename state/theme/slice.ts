import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  value: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toogleTheme: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toogleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.value;
export default themeSlice.reducer;
