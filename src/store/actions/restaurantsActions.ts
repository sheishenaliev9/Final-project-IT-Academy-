import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const RESTO_URL = "https://restaurant--ormonov31261.repl.co/api/v1/restaurant";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk4Njk2OTk4LCJpYXQiOjE2OTgyNjQ5OTgsImp0aSI6ImQ5YmUwYWY3M2I2ZjQ2NTRhOWI2YjIwYWIxODVkYWIzIiwidXNlcl9pZCI6MX0.Tq_bcgQaeqdg64wX2xbLCE6KEhhB2_eqBkN0OfEfgY4";

export const getRestaurants = createAsyncThunk("getRestaurants", async () => {
  try {
    const { data } = await axios.get(`${RESTO_URL}/restaurant_view/`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
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
