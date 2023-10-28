import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICartResultType } from "../../types/index.type";
import { addToCart, getCart } from "..";
//
interface ICartState {
  cart: ICartResultType[];
}

interface IAddToCartPayload {
  restaurant_id: number;
  item: {
    id: number;
    type: string;
  };
}

const initialState: ICartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartAction: (state, { payload }: PayloadAction<IAddToCartPayload>) => {
      const currentRestaurant: any = state.cart.find(
        ({ id }) => payload.restaurant_id === id
      );
      const filteredCart = state.cart.filter(
        ({ id }) => id !== payload.restaurant_id
      );
      console.log(filteredCart);

      if (currentRestaurant) {
        currentRestaurant[payload.item.type].push(payload.item.id);
        filteredCart.push(currentRestaurant);
        state.cart = filteredCart;
      } else {
        state.cart.push({
          id: payload.restaurant_id,
          totalPrice: 0,
          person: 1,
          drinks: [],
          dishes: [],
          [payload.item.type]: [payload.item.id],
        });
      }
    },
  },
  extraReducers: {
    [getCart.fulfilled.type]: (
      state,
      action: PayloadAction<ICartResultType[]>
    ) => {
      state.cart = action.payload;
    },
    [addToCart.fulfilled.type]: (
      state,
      action: PayloadAction<ICartResultType[]>
    ) => {
      state.cart = action.payload;
    },
  },
});

export const { addToCartAction } = cartSlice.actions;
