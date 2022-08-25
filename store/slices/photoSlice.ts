import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchTestPhotos } from "../actions/photos";

interface photosState {
  entities: any[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: any;
  currentRequestId: any;
}

const initialState: photosState = {
  entities: [] as any,
  status: "idle",
  currentRequestId: "",
  error: null,
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    setAllPhotos: (state, action) => {
      state.entities = state.entities.concat(action.payload);
      state.status = "succeeded";
      state.currentRequestId = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.photo.entities) {
        return state;
      }
      const nextState = {
        ...state, // use previous state
        ...action.payload.photo, // apply delta from hydration
      };
      return nextState;
    },
    [fetchTestPhotos.pending.type]: (state, action) => {
      if (state.status === "idle") {
        state.status = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchTestPhotos.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.status === "pending" && state.currentRequestId === requestId) {
        state.status = "succeeded";
        state.entities = [...state.entities, ...action.payload];
        state.currentRequestId = null;
      }
    },
    [fetchTestPhotos.rejected.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.status === "pending" && state.currentRequestId === requestId) {
        state.status = "failed";
        state.error = action.error;
        state.currentRequestId = null;
      }
    },
  },
});

export const { setAllPhotos } = photosSlice.actions;

export default photosSlice.reducer;
