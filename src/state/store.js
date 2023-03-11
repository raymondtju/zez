import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./theme/slice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import { userSlice } from "./user/slice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  theme: themeSlice.reducer,
  user: userSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export const persistor = persistStore(store);
