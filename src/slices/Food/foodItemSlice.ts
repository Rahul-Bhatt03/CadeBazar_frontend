import { FoodItem } from "@/src/utils/Types/Category/FoodItem.types";
import { mainApi } from "../mainApi";
import { CreateFoodItem, UpdateFoodItem } from "@/src/utils/Dto/Category/FoodItem.dto";

export const foodItemApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getFoodItems: builder.query<FoodItem[], void>({
      query: () => ({
        url: "FoodItem/FoodItems",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({
                type: "FoodItem" as const,
                id: item.foodItemId,
              })),
              { type: "FoodItem", id: "LIST" },
            ]
          : [{ type: "FoodItem", id: "LIST" }],
    }),

    getFoodItem: builder.query<FoodItem, number>({
      query: (id) => ({
        url: `FoodItem/FoodItem/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "FoodItem", id }],
    }),

  
    addFoodItem: builder.mutation<FoodItem, CreateFoodItem>({
      query: (body) => ({
        url: "FoodItem/createFoodItem",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: "FoodItem", id: "LIST" }],
    }),


    updateFoodItem: builder.mutation<
      FoodItem,
      { id: number; body: UpdateFoodItem }
    >({
      query: ({ id, body }) => ({
        url: `FoodItem/updateFoodItem/${id}`,
        method: "PUT",
        data: body,
      }),

      async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          foodItemApi.util.updateQueryData("getFoodItem", id, (draft) => {
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
        { type: "FoodItem", id },
        { type: "FoodItem", id: "LIST" },
      ],
    }),

 
    deleteFoodItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `FoodItem/deleteFoodItem/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          foodItemApi.util.updateQueryData(
            "getFoodItems",
            undefined,
            (draft) => draft.filter((item) => item.foodItemId !== id)
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },

      invalidatesTags: (_, __, id) => [
        { type: "FoodItem", id },
        { type: "FoodItem", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetFoodItemsQuery,
  useGetFoodItemQuery,

  // Lazy Queries
  useLazyGetFoodItemsQuery,
  useLazyGetFoodItemQuery,

  // Mutations
  useAddFoodItemMutation,
  useUpdateFoodItemMutation,
  useDeleteFoodItemMutation,
} = foodItemApi;
