import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchUsers } from "../actions/users";

const initialState = {
  entities: [] as any,
  status: "loading",
  error: {},
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setServerItems: (state, action) => {
      state.entities = state.entities.concat(action.payload);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.user.entities) {
        return state;
      }
      state.entities = action.payload.user.entities;
    },
    [fetchUsers.pending.type]: (state) => {
      state.status = "loading";
    },
    [fetchUsers.fulfilled.type]: (state, action) => {
      state.status = "succeeded";
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchUsers.rejected.type]: (state, action) => {
      state.status = "failed";
      state.error = action.error;
    },
  },
});

export const { setServerItems } = usersSlice.actions;

export default usersSlice.reducer;
