import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { fetchUsers } from "../actions/users";

interface usersState {
  entities: any[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: {};
  currentRequestId: any;
}

const initialState: usersState = {
  entities: [] as any,
  status: "idle",
  error: {},
  currentRequestId: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setServerItems: (state, action) => {
      state.entities = state.entities.concat(action.payload);
      state.status = "succeeded";
      state.currentRequestId = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.user.entities) {
        return state;
      }
      const nextState = {
        ...state, // use previous state
        ...action.payload.user, // apply delta from hydration
      };
      return nextState;
    },
    [fetchUsers.pending.type]: (state, action) => {
      if (state.status === "idle") {
        state.status = "pending";
        state.currentRequestId = action.meta.requestId;
      }
    },
    [fetchUsers.fulfilled.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.status === "pending" && state.currentRequestId === requestId) {
        state.status = "succeeded";
        state.entities = [...state.entities, ...action.payload];
        state.currentRequestId = null;
      }
    },
    [fetchUsers.rejected.type]: (state, action) => {
      const { requestId } = action.meta;
      if (state.status === "pending" && state.currentRequestId === requestId) {
        state.status = "failed";
        state.error = action.error;
        state.currentRequestId = null;
      }
    },
  },
});

export const { setServerItems } = usersSlice.actions;

export default usersSlice.reducer;
