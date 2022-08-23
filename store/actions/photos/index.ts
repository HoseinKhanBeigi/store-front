import { http } from "../../../services/http";
import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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

const createAsyncAction = (type: string, payload: any) => {
  return createAsyncThunk(type, async (page: number, { rejectWithValue }) => {
    try {
      const listApiFields = {
        pageIndex: 1,
        pageSize: 10,
        params: [],
        hasPagination: null,
        apiUrl: null,
        ...payload,
      };
      let routeParamsPath = "";
      for (const field of listApiFields.params) {
        routeParamsPath += "/" + field;
      }
      console.log(routeParamsPath, " routeParamsPath");
      delete listApiFields.params;
      const { resultKey } = payload || {};
      const url = listApiFields.apiUrl + routeParamsPath;
      const { pageIndex, pageSize, hasPagination, ...param } = listApiFields;
      if (param.resultKey) {
        delete param.resultKey;
      }
      const params = { ...param };
      if (hasPagination) {
        params.page = pageIndex;
        params.limit = pageSize;
        params.skip = pageIndex * pageSize - pageSize;
      }

      const response: AxiosResponse<any, any> | void = await http.get(url, {
        signal: controller.signal,
        params,
      });
      const data = JSON.parse(JSON.stringify(response?.data));
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  });
};

export const fetchTestPhotos = createAsyncAction("photos/fetchByIdStatus", {
  params: [{ page: 1 }, { client_id: "" }, { apiUrl: "/photos" }],
});
