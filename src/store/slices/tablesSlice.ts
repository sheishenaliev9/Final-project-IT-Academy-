import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTables } from "..";
import { ITableType } from "../../types/index.type";

interface ITableState {
  tables: ITableType[];
  tableNumber: number;
  tableId: number;
}

const initialState: ITableState = {
  tables: [],
  tableNumber: 0,
  tableId: 0
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTableId: (state, { payload }: PayloadAction<number>) => {
      state.tableId = payload;
    },
    setTableNumber: (state, { payload }: PayloadAction<number>) => {
      state.tableNumber = payload;
    }
  },
  extraReducers: {
    [getTables.fulfilled.type]: (
      state,
      action: PayloadAction<ITableType[]>
    ) => {
      state.tables = action.payload;
    },
  },
});

export const { setTableId, setTableNumber } = tablesSlice.actions;