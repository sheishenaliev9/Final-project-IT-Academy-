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
    [getCart.fulfilled.type]: (state, { payload }: PayloadAction<ICartType[]>) => {
      state.cart = payload;
    },
    [addToCart.fulfilled.type]: (state, { payload }: PayloadAction<ICartType[]>) => {
      state.cart = payload;
    },
  },
});
