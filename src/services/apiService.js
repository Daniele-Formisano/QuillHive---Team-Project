import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users",
    }),
    /* addPosts: builder.mutation({
      query: (user) => ({
        url: "user",
        method: "POST",
        body: user,
      }),
    }), */
  }),
});

export const { useGetUsersQuery } = apiService;
