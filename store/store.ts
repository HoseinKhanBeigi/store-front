import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { createWrapper } from "next-redux-wrapper";
import usersSlice from "../store/slices/userSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: usersSlice,
    },
  });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore);
