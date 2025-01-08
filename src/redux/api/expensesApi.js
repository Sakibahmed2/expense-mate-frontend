import { baseApi } from "./baseApi";

const expensesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpenses: builder.mutation({
      query: (data) => ({
        url: `/expenses`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["expenses"],
    }),

    getExpenses: builder.query({
      query: () => `/expenses`,
      providesTags: ["expenses"],
    }),

    getSingleExpense: builder.query({
      query: ({ id }) => {
        return {
          url: `/expenses/${id}`,
          method: "GET",
        };
      },
      providesTags: ["expenses"],
    }),

    updateExpenses: builder.mutation({
      query: ({ id, data }) => ({
        url: `/expenses/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["expenses"],
    }),

    deleteExpenses: builder.mutation({
      query: (id) => ({
        url: `/expenses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expenses"],
    }),
  }),
});

export const {
  useCreateExpensesMutation,
  useGetExpensesQuery,
  useGetSingleExpenseQuery,
  useUpdateExpensesMutation,
  useDeleteExpensesMutation,
} = expensesApi;
