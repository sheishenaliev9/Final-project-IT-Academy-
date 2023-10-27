import { configureStore } from "@reduxjs/toolkit";
import { restaurantsSlice, usersSlice } from "./slices";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    restaurants: restaurantsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptach = typeof store.dispatch;
