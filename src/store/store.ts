import { configureStore } from "@reduxjs/toolkit";
import { cartSlice, restaurantsSlice, tablesSlice, usersSlice } from "./slices";

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    restaurants: restaurantsSlice.reducer,
    cart: cartSlice.reducer,
    tables: tablesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDisptach = typeof store.dispatch;
