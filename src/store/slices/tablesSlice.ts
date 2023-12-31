import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTables } from "../actions";
import { ITableType } from "../../types/index.type";

interface ITableState {
  tables: ITableType[];
  reservedTables: ITableType[];
  tableNumber: number;
  tableId: number;
  selectedTableId: number;
  isLoading: boolean;
}

const initialState: ITableState = {
  tables: [],
  reservedTables: [],
  tableNumber: 0,
  tableId: 0,
  selectedTableId: 0,
  isLoading: false,
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
    setSelectedTableId: (state, { payload }) => {
      state.selectedTableId = payload;
    },
    setReservedTables: (state, { payload }) => {
      state.reservedTables = state.tables.filter(
        (table) => table.reserved_by === payload
        );
        
    },
  },
  extraReducers: {
    [getTables.fulfilled.type]: (
      state,
      { payload }: PayloadAction<ITableType[]>
    ) => {
      state.tables = payload;
    },
    [getTables.pending.type]: (state) => {
      state.isLoading = true
    },
  },
});

export const {
  setTableId,
  setTableNumber,
  setSelectedTableId,
  setReservedTables,
} = tablesSlice.actions;
