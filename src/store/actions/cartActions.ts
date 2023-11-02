import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ICartActions } from "../../types/index.type";


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
    console.log(data);
    return data;
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
  async (values: ICartActions) => {
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

export const clearCart = createAsyncThunk(
  "deleteFromCart",
  async (values: ICartActions) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_RESTO_URL}/cart_update/`,
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
  }
);

export const deleteFromCart = createAsyncThunk(
  "deleteFromCart",
  async (values: ICartActions) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_RESTO_URL}/cart_update/`,
        values,
        { headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` } }
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
