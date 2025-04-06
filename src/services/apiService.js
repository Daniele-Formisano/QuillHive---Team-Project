import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (user) => {
        let params = new URLSearchParams();

        if (user?.email) params.append("email", user.email);
        if (user?.password) params.append("password", user.password);
        if (user?.username) params.append("username", user.username);

        return `users${params.toString() ? `?${params.toString()}` : ""}`;
      },
    }),

    addUsers: builder.mutation({
      query: (user) => ({
        url: "users",
        method: "POST",
        body: user,
      }),
    }),

    getUserGenres: builder.query({
      query: () => "userGenres",
    }),

    addUserGenres: builder.mutation({
      query: (userGenre) => ({
        url: "userGenres",
        method: "POST",
        body: userGenre,
      }),
    }),

    getUserArtistTypes: builder.query({
      query: () => "userArtistTypes",
    }),

    addUserArtistTypes: builder.mutation({
      query: (userArtistType) => ({
        url: "userArtistTypes",
        method: "POST",
        body: userArtistType,
      }),
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

    getUserProjects: builder.query({
      query: (userId) => `stories?userId=${userId}`,
    }),

    addBio: builder.mutation({
      query: (bio) => ({
        url: "users",
        method: "UPDATE",
        body: bio,
      }),
    }),
    getChapters: builder.query({
      query: () => "chapters",
    }),

    addChapter: builder.mutation({
      query: (chapter) => ({
        url: "chapter",
        method: "POST",
        body: chapter,
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
  useAddUsersMutation,
  useGetUserGenresQuery,
  useLazyGetUserGenresQuery,
  useAddUserGenresMutation,
  useLazyGetUserArtistTypesQuery,
  useAddUserArtistTypesMutation,
  useGetUserProjectsQuery,
  useLazyGetUserProjectsQuery,
  useAddBioMutation,
  useGetChaptersQuery,
  useAddChapterMutation,
} = apiService;
