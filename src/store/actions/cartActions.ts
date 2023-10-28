import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ICartType } from "../../types/index.type";

export const getCart = createAsyncThunk("getCart", async () => {
  try {
    const { data } = await axios.get<ICartType>(
      `${import.meta.env.VITE_RESTO_URL}/cart_view/`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      }
    );
    console.log(data.results);
    return data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
  }
});

export const addToCart = createAsyncThunk(
  "addToCart",
  async ({ data, id }: { data: ICartType, id: number }) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_RESTO_URL}/cart_create/${id}/`,
        data,
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
  }
);
