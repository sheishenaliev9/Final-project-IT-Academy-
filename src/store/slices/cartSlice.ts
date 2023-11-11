import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { addToCart, getCart } from "../actions";
import { ICartType } from "../../types/index.type";

interface ICartState {
  cart: ICartType[];
  total_price: number
}

const initialState: ICartState = {
  cart: [],
  total_price: 0
};


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [getCart.fulfilled.type]: (state, { payload }: PayloadAction<ICartType[]>) => {
      state.cart = payload;
      state.total_price = state.cart[0].total_price;
    },
    [addToCart.fulfilled.type]: (state, { payload }: PayloadAction<ICartType[]>) => {
      state.cart = payload;
    },
  },
});
