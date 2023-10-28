import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getRestaurants = createAsyncThunk("getRestaurants", async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_RESTO_URL}/restaurant_view/`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
      },
    });

    console.log(data);
    return data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
  }
});

export const getOneRestaurant = createAsyncThunk(
  "getOneRestaurant",
  async (id: number) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_RESTO_URL}/restaurant_view/${id}/`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });

      console.log(data);
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
