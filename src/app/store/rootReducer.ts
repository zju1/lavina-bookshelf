import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";
import { authService } from "./services/auth.service";
import { apiService } from "./services/api.service";

export const rootReducer = combineReducers({
  auth: authSlice,
  [authService.reducerPath]: authService.reducer,
  [apiService.reducerPath]: apiService.reducer,
});
