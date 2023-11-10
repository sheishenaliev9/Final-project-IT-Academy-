import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IReviewType } from "../../types/index.type";

export const getRestaurants = createAsyncThunk("getRestaurants", async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_RESTO_URL}/restaurant_view/`,
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

export const getOneRestaurant = createAsyncThunk(
  "getOneRestaurant",
  async (id: number) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_RESTO_URL}/restaurant_view/${id}/`,
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

export const addReview = createAsyncThunk(
  "addReview",
  async (values: IReviewType, { dispatch }) => {
    try {
      await axios.post(`${import.meta.env.VITE_RESTO_URL}/review/`, values, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });
      dispatch(getOneRestaurant(values.restaurant));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  }
);

export const deleteReview = createAsyncThunk(
  "deleteReview",
  async (
    { id, restaurant_id }: { id: number; restaurant_id: number },
    { dispatch }
  ) => {
    try {
      await axios.delete(`${import.meta.env.VITE_RESTO_URL}/review/${id}/`, { 
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`
        }
      });
      dispatch(getOneRestaurant(restaurant_id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    }
  }
);
