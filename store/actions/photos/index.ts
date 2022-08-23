import { http } from "../../../services/http";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPhotos = createAsyncThunk(
  "users/fetchByIdStatus",
  async (page: number) => {
    const response = await http.get(
      `/photos?page=${page}&client_id=${process.env.CLIENT_ID}`
    );
    const data = JSON.parse(JSON.stringify(response.data));
    return data;
  }
);
