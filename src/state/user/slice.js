import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
