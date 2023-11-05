import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addToCart, getCart } from "../actions";
import { ICartType } from "../../types/index.type";

interface ICartState {
  cart: ICartType[];
}

const initialState: ICartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [getCart.fulfilled.type]: (state, action: PayloadAction<ICartType[]>) => {
      state.cart = action.payload;
    },
    [addToCart.fulfilled.type]: (state, action: PayloadAction<ICartType[]>) => {
      state.cart = action.payload;
    },
  },
});
