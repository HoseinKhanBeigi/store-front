import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";

interface user {}

const initialState = {
  entities: [] as any,
  loading: "loading",
  error: {},
};

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
      if (state.loading === "loading") {
        state.loading = "pending";
        return state;
      }
    },
    [fetchUsers.fulfilled.type]: (state, action) => {
      if (state.loading === "pending") {
        state.loading = "loaded";
        state.entities = [...state.entities, ...action.payload];
        return state;
      }
    },
    [fetchUsers.rejected.type]: (state, action) => {
      state.loading = "loaded";
      state.error = action.error;
    },
  },
});

export const { setServerItems } = usersSlice.actions;

export default usersSlice.reducer;
