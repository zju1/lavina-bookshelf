import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { envVars } from "../../../constants/envVars";
import { BaseAPI } from "../../../@types";
import { User } from "../../../hooks/useAuth";
import { AuthDTO } from "../../../features/auth/dto/auth.dto";

export const authService = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: envVars.BASE_URL,
  }),
  endpoints: (builder) => ({
    signup: builder.mutation<BaseAPI<User>, AuthDTO>({
      query: (body) => ({
        body,
        url: "signup",
        method: "POST",
      }),
    }),
  }),
});

export const { useSignupMutation } = authService;
