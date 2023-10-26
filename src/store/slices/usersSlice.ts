import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPersonType } from "../../types/index.type";
import { getUserInfo, registerUser } from "../actions";

interface IUserState {
  userInfo: IPersonType;
}

const initialState: IUserState = {
  userInfo: {} as IPersonType,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [registerUser.fulfilled.type]: (
      state,
      action: PayloadAction<IPersonType>
    ) => {
      state.userInfo = action.payload;
    },
    [getUserInfo.fulfilled.type]: (
      state,
      action: PayloadAction<IPersonType>
    ) => {
      state.userInfo = action.payload;
    },
  },
});
