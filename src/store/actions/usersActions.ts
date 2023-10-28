import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IPersonType, IUserType } from "../../types/index.type";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (newUser: IUserType) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_AUTH_URL}/user/`,
        newUser,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      );

      localStorage.setItem("token", data.access);
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

export const loginUser = createAsyncThunk(
  "loginUser",
  async (user: IUserType) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_TOKEN_URL}`,
        user,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      );

      localStorage.setItem("token", data.access);
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

export const getUserInfo = createAsyncThunk("getUserInfo", async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_AUTH_URL}/current_user/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return data.person_data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
  }
});

export const editPerson = createAsyncThunk(
  "editPerson",
  async ({ newData, id }: { newData: IPersonType; id: number }) => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_AUTH_URL}/person/${id}/`, newData, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });

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
