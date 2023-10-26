import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDishes } from "..";
import { IDishType } from "../../types/index.type";

interface IDishState {
  dishes: IDishType[];
}

const initialState: IDishState = {
  dishes: [],
};

export const dishesSlice = createSlice({
  name: "dishes",
  initialState,
  reducers: {},
  extraReducers: {
    [getDishes.fulfilled.type]: (state, action: PayloadAction<IDishType[]>) => {
      state.dishes = action.payload;
    },
  },
});