import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (login) =>
        `users${login && `?email=${login.email}&password=${login.password}`}`,
    }),
    getGenres: builder.query({
      query: () => "genres",
    }),
    getArtistType: builder.query({
      query: () => "artistTypes",
    }),
    getLanguages: builder.query({
      query: () => "languages",
    }),
    getUserLanguages: builder.query({
      query: (userId) => `userLanguages?userId=${userId}`,
    }),
    getStories: builder.query({
      query: ()=> "stories"
    }),
    /* addStory: builder.mutation({
      query: (user) => ({
        url: "user",
        method: "POST",
        body: user,
      }),
    }), */
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetGenresQuery,
  useGetArtistTypeQuery,
  useGetLanguagesQuery,
  useGetUserLanguagesQuery,
  useLazyGetUserLanguagesQuery,
  useGetStoriesQuery, 
} = apiService;
