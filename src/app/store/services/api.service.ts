import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import md5 from "md5";
import { envVars } from "../../../constants/envVars";
import { BaseAPI } from "../../../@types";
import { User } from "../../../hooks/useAuth";
import { RootState } from "../store.config";
import {
  AddedBook,
  Book,
  UpdateBookDTO,
} from "../../../features/books/dto/book.dto";

export const apiService = createApi({
  reducerPath: "mainApi",
  tagTypes: ["MY_BOOKS"],
  baseQuery: (args, api, extraOptions) => {
    return fetchBaseQuery({
      baseUrl: envVars.BASE_URL,
      prepareHeaders(headers, reduxAPI) {
        const state = reduxAPI.getState() as RootState;
        const user = state.auth.user;
        const key = user?.key;
        const rawSecret = args?.body
          ? `${args?.method || "GET"}/${args.url}${JSON.stringify(args.body)}${
              user?.secret
            }`
          : `${args?.method || "GET"}/${args.url}${user?.secret}`;

        headers.set("Key", String(key));
        headers.set("Sign", md5(rawSecret));
        return headers;
      },
    })(args, api, extraOptions);
  },

  endpoints: (builder) => ({
    getMe: builder.query<BaseAPI<User>, void>({
      query: () => ({
        url: "myself",
      }),
    }),
    getAllBooks: builder.query<BaseAPI<AddedBook[]>, void>({
      query: () => ({
        url: "books",
      }),
      providesTags: ["MY_BOOKS"],
    }),
    searchBook: builder.query<BaseAPI<Book[]>, string>({
      query: (title) => ({
        url: `books/${title}`,
      }),
    }),
    createBook: builder.mutation<BaseAPI<AddedBook>, string>({
      query: (title) => ({
        url: `books`,
        body: {
          isbn: title,
        },
        method: "POST",
      }),
      invalidatesTags: ["MY_BOOKS"],
    }),
    updateBook: builder.mutation<
      BaseAPI<AddedBook>,
      { id: string; body: UpdateBookDTO }
    >({
      query: ({ id, body }) => ({
        url: `books/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["MY_BOOKS"],
    }),
    deleteBook: builder.mutation<BaseAPI<AddedBook>, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MY_BOOKS"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAllBooksQuery,
  useSearchBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = apiService;
