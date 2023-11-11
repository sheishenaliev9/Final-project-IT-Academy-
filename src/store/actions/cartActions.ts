import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ICartActions } from "../../types/index.type";
import { toast } from "react-toastify";

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

      
      if (data.message === "Restaurant and dish or drinks are not from the same restaurant") {
        return toast.error("У вас в корзине уже имеется блюдо с другого ресторана.")
      } 
      toast.success("Блюдо в корзине!")
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
  async (values: ICartActions, { dispatch }) => {
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
      toast.success("Корзина успешно очистилась!");
      dispatch(getCart());
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
  async (values: ICartActions, { dispatch }) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_RESTO_URL}/cart_update/`,
        values,
        { headers: { Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` } }
      );
      toast.success("Успешно удалено!");
      dispatch(getCart());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  }
);

export const addCartToTable = createAsyncThunk(
  "addCartToTable",
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
