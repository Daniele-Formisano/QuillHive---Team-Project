import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiService = createApi({
  reducerPath: "apiService",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["Post", "UserStory", "Chapter", "Story", "User"], //for auto refetching
  endpoints: (builder) => ({
    // per ottenere tutti gli users
    getUsers: builder.query({
      query: () => "api/users",
      providesTags: ["User"],
    }),

    // per ottenere le informazioni detagliate di un solo user
    getUserById: builder.query({
      query: (id) => `api/users/${id}`,
      providesTags: ["User"],
    }),

    //rotta per il login
    login: builder.mutation({
      query: (user) => ({
        url: "api/login",
        method: "POST",
        body: user,
      }),
    }),

    // rotta per la registrazione dell'utente
    addUsers: builder.mutation({
      query: (user) => ({
        url: "api/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),

    // rotta validazione username e email utente
    validationUsernameEmail: builder.mutation({
      query: (usernameOrEmail) => ({
        url: "api/users/validUsernameOrEmail",
        method: "POST",
        body: usernameOrEmail,
      }),
    }),

    // per modificare le informazioni di un user
    updateUser: builder.mutation({
      query: (updatedUserData) => ({
        url: `api/users/${updatedUserData.id}`,
        method: "PUT",
        body: updatedUserData,
      }),
      invalidatesTags: ["User"],
    }),

    // per ottenere le storie create da un user
    getUserProjects: builder.query({
      query: (userId) => `api/stories/storiesOfUser/${userId}`,
      invalidatesTags: ["Story"],
    }),

    // per ottenere tutte le storie che l'utente ha salvato o inizato a leggere
    getUserStories: builder.query({
      query: (id) => `api/users/userStories/${id}`,
      providesTags: ["UserStory"], // tutti gli userStory sono sotto il cachetag userStory
    }),

    // per ottenere una singola storia che l'utente ha salvato o inizato a leggere
    getUserStory: builder.query({
      query: (userStory) =>
        `api/users/userStories/${userStory.userId}/${userStory.storyId}`,
      providesTags: ["UserStory"], // tutti gli userStory sono sotto il cachetag userStory
    }),

    // per inserire le storie che l'utente ha salvato o inizato a leggere
    addUserStories: builder.mutation({
      query: (userStories) => ({
        url: `api/users/userStories/${userStories.userId}/${userStories.storyId}`,
        method: "POST",
        body: { status: userStories.status, saved: userStories.saved },
      }),
      invalidatesTags: ["UserStory"],
    }),

    // per ottenere tutti i generi dei libri
    getGenres: builder.query({
      query: () => "api/genres",
    }),

    // per ottenere tutti gli artist types
    getArtistType: builder.query({
      query: () => "api/artistTypes",
    }),

    // per ottenere tutte le lingue
    getLanguages: builder.query({
      query: () => "api/languages",
    }),

    // per ottenere tutte le storie
    getStories: builder.query({
      query: () => "api/stories",
      providesTags: ["Story"],
    }),

    // per aggiungere una storia da parte di un user
    addStory: builder.mutation({
      query: (story) => ({
        url: "api/stories",
        method: "POST",
        body: story,
      }),
      invalidatesTags: ["Story"],
    }),

    // per ottenere i capitoli di una storia
    getChaptersByStoryId: builder.query({
      query: (storyId) => `api/stories/${storyId}/chapters`,
      providesTags: ["Chapter"], // Filtro per ottenere solo i capitoli associati alla storia specifica
    }),

    // per aggiungere un capitolo in base alla storia
    addChapter: builder.mutation({
      query: (chapter) => ({
        url: `api/stories/${chapter.story_id}/chapters`,
        method: "POST",
        body: chapter,
      }),
      invalidatesTags: ["Chapter"],
    }),

    // per aggiornare il capitolo di una storia
    updateChapter: builder.mutation({
      query: (chapter) => ({
        url: `api/chapters/${chapter.id}`,
        method: "PUT",
        body: chapter,
      }),
      invalidatesTags: ["Chapter"],
    }),

    // per eliminare il capitolo di una storia
    deleteChapter: builder.mutation({
      query: (chapter) => ({
        url: `api/chapters/${chapter.id}`, // L'ID del capitolo è passato nel body o come parte dell'URL
        method: "DELETE",
      }),
      invalidatesTags: ["Chapter"],
    }),
  }),
});
export const {
  useAddStoryMutation,
  useLoginMutation,
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useGetGenresQuery,
  useGetArtistTypeQuery,
  useGetLanguagesQuery,
  useGetStoriesQuery,
  useAddUsersMutation,
  useGetUserProjectsQuery,
  useLazyGetUserProjectsQuery,
  useGetUserStoriesQuery,
  useGetUserStoryQuery,
  useLazyGetUserStoryQuery,
  useLazyGetStoriesQuery,
  useGetChaptersByStoryIdQuery,
  useAddChapterMutation,
  useUpdateChapterMutation,
  useUpdateUserMutation,
  useAddUserStoriesMutation,
  useDeleteChapterMutation,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useValidationUsernameEmailMutation,
} = apiService;
