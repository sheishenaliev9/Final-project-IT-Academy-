import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPersonType } from "../../types/index.type";
import { editPerson, getUserInfo, registerUser } from "../actions";

interface IUserState {
  userInfo: IPersonType;
  errorMessage: string | null
}

const initialState: IUserState = {
  userInfo: {} as IPersonType,
  errorMessage: null
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
    [editPerson.fulfilled.type]: (
      state,
      action: PayloadAction<IPersonType>
    ) => {
      state.userInfo = action.payload;
    },
  },
});
