import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IAddToCart {
  person_id: string;
  dish_id?: string;
  drink_id?: string;
}

export const getCart = createAsyncThunk("getCart", async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_RESTO_URL}/cart_view/`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      }
    );
    console.log(data.results)
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
  async (values: IAddToCart) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_RESTO_URL}/cart_update/`,
        values,
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
  }
);
