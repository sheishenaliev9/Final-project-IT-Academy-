import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRestaurantType } from "../../types/index.type";
import { getRestaurants } from "../actions";

interface IRestaurantState {
  restaurants: IRestaurantType[];
}

const initialState: IRestaurantState = {
  restaurants: [],
};

export const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {},
  extraReducers: {
    [getRestaurants.fulfilled.type]: (
      state,
      action: PayloadAction<IRestaurantType[]>
    ) => {
      state.restaurants = action.payload;
    },
  },
});
