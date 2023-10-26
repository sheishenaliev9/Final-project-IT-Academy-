import { configureStore } from "@reduxjs/toolkit";
import { dishesSlice, usersSlice } from "./slices";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    dishes: dishesSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptach = typeof store.dispatch;
