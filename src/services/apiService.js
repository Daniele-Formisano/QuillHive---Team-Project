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
    /*  addStory: builder.mutation({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          id: ,
          title: "",
          plot: "",
          usersId: ,
          cover_image: "",
          status: "",
          likes: ,
          created_at: ,
          updated_at: ,
          languageId: ,
        },
      }),
    }), */
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
} = apiService;
