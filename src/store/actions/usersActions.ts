import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (newUser) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_AUTH_URL}/users/`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );

      localStorage.setItem("token", data.accessToken);
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
