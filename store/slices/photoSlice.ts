import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchPhotos } from "../actions/photos";

const initialState = {
  entities: [] as any,
  status: "loading",
  error: {},
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setServerItems: (state, action) => {
      state.entities = state.entities.concat(action.payload);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.photo.entities) {
        return state;
      }
      state.entities = action.payload.photo.entities;
    },
    [fetchPhotos.pending.type]: (state) => {
      state.status = "loading";
    },
    [fetchPhotos.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchPhotos.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const { setServerItems } = photosSlice.actions;

export default photosSlice.reducer;
