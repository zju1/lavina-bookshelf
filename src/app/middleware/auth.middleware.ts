/* eslint-disable @typescript-eslint/no-explicit-any */
import { Middleware } from "@reduxjs/toolkit";
import { setUser } from "../store/slices/auth.slice";

export const authMiddleWare: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action: any) => {
    if (action?.payload?.status === 401) {
      dispatch(setUser(null));
      localStorage.clear();
    }
    next(action);
  };
