import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IPersonType, IUserType } from "../../types/index.type";

const AUTH_URL = "https://restaurant--ormonov31261.repl.co/api/v1/user_auth";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4Njk2OTk4LCJpYXQiOjE2OTgyNjQ5OTgsImp0aSI6ImQ5YmUwYWY3M2I2ZjQ2NTRhOWI2YjIwYWIxODVkYWIzIiwidXNlcl9pZCI6MX0.Tq_bcgQaeqdg64wX2xbLCE6KEhhB2_eqBkN0OfEfgY4";

export const registerUser = createAsyncThunk(
  "registerUser",
  async (newUser: IUserType) => {
    try {
      const { data } = await axios.post(`${AUTH_URL}/user/`, newUser, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

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
        `https://restaurant--ormonov31261.repl.co/api/v1/user_auth/token/`,
        user,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
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
    const { data } = await axios.get(`${AUTH_URL}/current_user/`, {
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
      const { data } = await axios.put(`${AUTH_URL}/person/${id}/`, newData, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
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
