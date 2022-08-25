import { http } from "../../../services/http";
import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setAllPhotos } from "../../slices/photoSlice";

const controller = new AbortController();
export const fetchPhotos = createAsyncThunk(
  "photos/fetchByIdStatus",
  async (page: number, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<any, any> | void = await http.get(
        `/photos?page=${page}&client_id=${process.env.CLIENT_ID}`,
        {
          signal: controller.signal,
        }
      );
      const data = JSON.parse(JSON.stringify(response?.data));
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const createAsyncAction = (type: string) => {
  return createAsyncThunk(type, async (data: any, thunkAPI) => {
    const { page } = data;
    try {
      const response: AxiosResponse<any, any> | void = await http.get(
        "/photos",
        {
          params: {
            page,
            client_id: process.env.CLIENT_ID,
          },
        }
      );
      const data = JSON.parse(JSON.stringify(response?.data));
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  });
};

export const fetchTestPhotos = createAsyncAction("photos/fetchByIdStatus");

export const getAllPhotos = () => async (dispatch: any) => {
  const ID = "9Wd121GARqUasOmKrVzLztGLpWYuB_fOdqskU0VcZ28";
  const response: AxiosResponse<any, any> | void = await http.get(
    `/photos?page=${1}&client_id=${ID}`
  );
  const data = JSON.parse(JSON.stringify(response?.data));
  dispatch(setAllPhotos(data));
};
