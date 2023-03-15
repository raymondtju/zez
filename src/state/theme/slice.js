import { createSlice } from "@reduxjs/toolkit";

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

export default themeSlice.reducer;
