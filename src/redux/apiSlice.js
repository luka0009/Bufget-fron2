import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: "https://financial-management.onrender.com" }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `/api/categories`,
      providesTags: ["categories"],
    }),
    getLabels: builder.query({
      query: () => `/api/labels`,
      providesTags: ["transaction"],
    }),
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: "/api/transactions",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/api/transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["transaction"],
    }),
    updateTransaction: builder.mutation({
        query: (id, update) => ({
          url: `/api/transactions/${id}`,
          method: "PATCH",
          body: update,
        }),
        invalidatesTags: ["transaction"],
      }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetLabelsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
} = apiSlice;
