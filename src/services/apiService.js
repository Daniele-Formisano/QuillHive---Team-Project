import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Post", "UserStory", "Chapter", "Story"], //for auto refetching
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (user) => {
        let params = new URLSearchParams();

        if (user?.email) params.append("email", user.email);
        if (user?.password) params.append("password", user.password);
        if (user?.username) params.append("username", user.username);
        if (user?.id) params.append("id", user.id);
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
      query: (id) => `userArtistTypes?userId=${id}`,
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

    getUserStories: builder.query({
      query: (userStories) => {
        let params = new URLSearchParams();
        if (userStories?.storyId) params.append("storyId", userStories.storyId);
        if (userStories?.userId) params.append("userId", userStories.userId);

        return `userStories${params.toString() ? `?${params.toString()}` : ""}`;
      },
      providesTags: ["UserStory"], // tutti gli userStory sono sotto il cachetag userStory
    }),

    addUserStory: builder.mutation({
      query: (newStory) => ({
        url: "userStories",
        method: "POST",
        body: newStory,
      }),
      invalidatesTags: ["UserStory"],
    }),

    updateUserStories: builder.mutation({
      query: (userStory) => ({
        url: `userStories/${userStory.id}`, // Assicurati di passare l'id del capitolo per l'aggiornamento
        method: "PUT",
        body: userStory,
      }),
      invalidatesTags: ["UserStory"],
    }),

    addUserStory: builder.mutation({
      query: (newStory) => ({
        url: "userStories",
        method: "POST",
        body: newStory,
      }),
      invalidatesTags: ["UserStory"],
    }),

    getStories: builder.query({
      query: (story) => {
        let params = new URLSearchParams();

        if (story?.storyId) params.append("id", story.storyId);
        if (story?.userId) params.append("userId", story.userId);

        return `stories${params.toString() ? `?${params.toString()}` : ""}`;
      },
      providesTags: ["Story"],
    }),

    addStory: builder.mutation({
      query: (story) => ({
        url: "stories",
        method: "POST",
        body: story,
      }),
      invalidatesTags: ["Story"],
    }),

    getUserProjects: builder.query({
      query: (userId) => `stories?userId=${userId}`,
      invalidatesTags: ["Chapter"],
    }),

    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),

    updateUser: builder.mutation({
      query: (updatedUserData) => ({
        url: `users/${updatedUserData.id}`,
        method: "PATCH",
        body: updatedUserData,
      }),
    }),
    /* getChapters: builder.query({
      query: () => "chapters",
    }), */
    getChaptersByStoryId: builder.query({
      query: (storyId) => `chapters?storyId=${storyId}`,
      providesTags: ["Chapter"], // Filtro per ottenere solo i capitoli associati alla storia specifica
    }),
    addChapter: builder.mutation({
      query: (chapter) => ({
        url: "chapters",
        method: "POST",
        body: chapter,
      }),
      invalidatesTags: ["Chapter"],
    }),
    updateChapter: builder.mutation({
      query: (chapter) => ({
        url: `chapters/${chapter.id}`, // Assicurati di passare l'id del capitolo per l'aggiornamento
        method: "PUT",
        body: chapter,
      }),
      invalidatesTags: ["Chapter"],
    }),

    deleteChapter: builder.mutation({
      query: (chapter) => ({
        url: `chapters/${chapter.id}`, // L'ID del capitolo è passato nel body o come parte dell'URL
        method: "DELETE",
      }),
      invalidatesTags: ["Chapter"],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
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
  useGetUserArtistTypesQuery,
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
  useGetUserStoriesQuery,
  useLazyGetStoriesQuery,
  useGetChaptersByStoryIdQuery,
  useAddChapterMutation,
  useUpdateChapterMutation,
  useUpdateUserMutation,
  useAddUserStoryMutation,
  useDeleteChapterMutation,
  useGetUserByIdQuery,
  useUpdateUserStoriesMutation,
} = apiService;
