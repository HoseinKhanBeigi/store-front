import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchTestPhotos } from "../actions/photos";

interface photosState {
  entities: any[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: {};
}

const initialState: photosState = {
  entities: [] as any,
  status: "idle",
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
    [fetchTestPhotos.pending.type]: (state) => {
      state.status = "idle";
    },
    [fetchTestPhotos.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchTestPhotos.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const { setServerItems } = photosSlice.actions;

export default photosSlice.reducer;
