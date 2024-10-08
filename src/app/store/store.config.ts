/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  persistReducer,
  PersistConfig,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer } from "./rootReducer";
import { envVars } from "../../constants/envVars";
import { authService } from "./services/auth.service";
import { authMiddleWare } from "../middleware/auth.middleware";
import { apiService } from "./services/api.service";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  blacklist: [authService.reducerPath, apiService.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer as any);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: !envVars.IS_PRODUCTION,
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authService.middleware, apiService.middleware, authMiddleWare);
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
