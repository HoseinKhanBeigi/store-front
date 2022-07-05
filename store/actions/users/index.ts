import { createAsyncThunk } from "@reduxjs/toolkit";
import { setServerItems } from "../../slices/userSlice";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
  "users/fetchByIdStatus",
  async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users`
    );
    const data = JSON.parse(JSON.stringify(response.data));
    return data;
  }
);

// alternative
export const getServerItems = () => async (dispatch: any) => {
  const res = await axios.get(`https://jsonplaceholder.typicode.com/users`);
  const data = JSON.parse(JSON.stringify(res.data));
  dispatch(setServerItems(data));
};
