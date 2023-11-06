import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IReserveTableType } from "../../types/index.type";
import { toast } from "react-toastify";

export const getTables = createAsyncThunk("getTables", async () => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_RESTO_URL}/table/`,
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

export const reserveTable = createAsyncThunk(
  "reserveTable",
  async (values: IReserveTableType, { dispatch }) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_RESTO_URL}/table/${values.id}/`,
        values,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      );
      console.log(data);
      if (!data.is_reserved) {
        return toast.error("Вы не можете забронировать больше 2 столов.");
      } else {
        toast.success(`Вы забронировали столик номер ${values.number}`);
        dispatch(getTables());
      }

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);
        toast.error("Что-то пошло не так.");
      } else {
        console.log(error);
      }
    }
  }
);
