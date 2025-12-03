
import { Category } from "@/src/utils/Types/Category/Category.types";
import { mainApi } from "../mainApi";
import { CategoryCreateDto, CategoryUpdateDto } from "@/src/utils/Dto/Category/Category.dto";

export const categoryApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "Category/Categories",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map((item) => ({ type: "Categories" as const, id: item.foodCategoryId })),
            { type: "Categories" as const, id: "LIST" },
          ]
          : [{ type: "Categories" as const, id: "LIST" }],

    }),

    getCategory: builder.query<Category, number>({
      query: (id) => ({
        url: `Category/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "Categories", id }],
    }),

    addCategory: builder.mutation<Category, CategoryCreateDto>({
      query: (body) => ({
        url: "Category/createCategory",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),

    updateCategory: builder.mutation<Category, { id: number; body: CategoryUpdateDto }>({
      query: ({ id, body }) => ({
        url: `Category/updateCategory/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          categoryApi.util.updateQueryData("getCategory", id, (draft) => {
            Object.assign(draft, body);
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: (_, __, { id }) => [
        { type: "Categories", id },
        { type: "Categories", id: "LIST" },
      ],
    }),

    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `Category/deleteCategory/${id}`,
        method: "PUT",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          categoryApi.util.updateQueryData(
            "getCategories",
            undefined,
            (draft) => {
              const index = draft.findIndex(
                (item) => item.foodCategoryId === id
              );
              if (index !== -1) draft.splice(index, 1);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: [{ type: "Categories", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,

  useLazyGetCategoriesQuery,
  useLazyGetCategoryQuery,

  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
