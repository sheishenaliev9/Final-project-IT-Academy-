import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ITableType } from "../../types/index.type";

export const getTables = createAsyncThunk("getTables", async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_RESTO_URL}/table/`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      }
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
  }
});

export const reserveTable = createAsyncThunk("reserveTable", async (values: ITableType) => {
  try {
    await axios.patch(
      `${import.meta.env.VITE_RESTO_URL}/table/${values.id}/`,
      values,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
  }
});
