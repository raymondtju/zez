import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./theme/slice";
import { userSlice } from "./user/slice";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// import thunk

// const createNoopStorage = () => {
//   return {
//     getItem(_key) {
//       return Promise.resolve(null);
//     },
//     setItem(_key, value) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key) {
//       return Promise.resolve();
//     },
//   };
// };

// const storage =
//   typeof window === "undefined" ? createNoopStorage() : createWebStorage();

// import { persistReducer, persistStore } from "redux-persist";
// import thunk from "redux-thunk";
// import { userSlice } from "./user/slice";

// const persistConfig = {
//   key: "persist-store",
//   storage,
// };

const reducers = combineReducers({
  theme: themeSlice.reducer,
  user: userSlice.reducer,
});

// const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  // middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
