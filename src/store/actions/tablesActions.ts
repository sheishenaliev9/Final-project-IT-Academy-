import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
