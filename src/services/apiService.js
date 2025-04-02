import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (user) => {
        /* `users${login && `?email=${login.email}&password=${login.password}`}`, */
        let params = new URLSearchParams();

        if (user.email) params.append("email", user.email);
        if (user.password) params.append("password", user.password);
        if (user.username) params.append("username", user.username);

        return `users${params.toString() ? `?${params.toString()}` : ""}`;
      },
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
      query: () => "stories",
    }),
    addStory: builder.mutation({
      query: (story) => ({
        url: "stories",
        method: "POST",
        body: story,
      }),
    }),
  }),
});

export const {
  useAddStoryMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetGenresQuery,
  useGetArtistTypeQuery,
  useGetLanguagesQuery,
  useGetUserLanguagesQuery,
  useLazyGetUserLanguagesQuery,
  useGetStoriesQuery,
} = apiService;
