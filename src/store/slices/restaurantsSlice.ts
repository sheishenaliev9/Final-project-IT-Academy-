import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRestaurantType } from "../../types/index.type";
import { getOneRestaurant, getRestaurants } from "../actions";

interface IRestaurantState {
  restaurants: IRestaurantType[];
  restaurant: IRestaurantType;
}

const initialState: IRestaurantState = {
  restaurants: [],
  restaurant: {} as IRestaurantType,
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
    [getOneRestaurant.fulfilled.type]: (
      state,
      action: PayloadAction<IRestaurantType>
    ) => {
      state.restaurant = action.payload;
    },
  },
});
