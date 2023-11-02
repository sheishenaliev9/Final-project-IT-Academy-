import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTables } from "..";
import { ITableType } from "../../types/index.type";

interface ITableState {
  tables: ITableType[];
}

const initialState: ITableState = {
  tables: [],
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {},
  extraReducers: {
    [getTables.fulfilled.type]: (
      state,
      action: PayloadAction<ITableType[]>
    ) => {
      state.tables = action.payload;
    },
  },
});
