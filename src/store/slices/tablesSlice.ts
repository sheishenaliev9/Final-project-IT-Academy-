import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTables } from "..";
import { ITableType } from "../../types/index.type";

interface ITableState {
  tables: ITableType[];
  tableNumber: number;
  tableId: number;
  selectedTableId: number;
}

const initialState: ITableState = {
  tables: [],
  tableNumber: 0,
  tableId: 0,
  selectedTableId: 0,
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
    },
    setSelectedTableId: (state, action) => {
      state.selectedTableId = action.payload;
    },
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

export const { setTableId, setTableNumber, setSelectedTableId } = tablesSlice.actions;
