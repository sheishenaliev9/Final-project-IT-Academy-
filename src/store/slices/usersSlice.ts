import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserType } from "../../types/index.type";
import { registerUser } from "../actions";

interface IUserState {
  userInfo: IUserType | null;
}

const initialState: IUserState = {
  userInfo: {} as IUserType | null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.fulfilled.type]: (state, action: PayloadAction<IUserType>) => {
      state.userInfo = action.payload;
    },
  },
});
