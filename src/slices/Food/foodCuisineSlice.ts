import { FoodCuisine } from "@/src/utils/Types/Category/FoodCuisine.types";
import { mainApi } from "../mainApi";

export const cuisineApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        getCuisines: builder.query<FoodCuisine[],void>({
            query: () => ({
                url: "FoodCuisine/Cuisine",
                method: "GET",
            }),
            providesTags: (result) => result ? [
                ...result.map((item) => ({
                    type: "Cuisine", id: item.foodCuisineId
                })),
                { type: "Cuisine", id: "LIST" }
            ] : [{
                type: "Cuisine", id: "LIST"
            }]
        }),

        getCuisine: builder.query({
            query: (id) => ({
                url: `FoodCuisine/Cuisine/${id}`,
                method: "GET",
            }),
            providesTags: (_, __, id) => [{
                type: "Cuisine", id
            }]
        }),

        addCuisine: builder.mutation({
            query: (body) => ({
                url: "FoodCuisine/CreateCuisine",
                method: "POST",
                data: body,
            }),
            invalidatesTags: [{
                type: "Cuisine", id: "LIST"
            }]
        }),

        updateCuisine: builder.mutation({
            query: ({ id, body }) => ({
                url: `FoodCuisine/UpdateCuisine/${id}`,
                method: "PUT",
                data: body
            }),
            async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
                const patch = dispatch(cuisineApi.util.updateQueryData("getCuisine", id, (draft) => {
                    Object.assign(draft, body);
                }));
                try {
                    await queryFulfilled;
                } catch {
                    patch.undo()
                };
            },
            invalidatesTags: (_, __, id) => [
                { type: "Cuisine", id },
                { type: "Cuisine", id: "LIST" },
            ],
        }),

        deleteCuisine: builder.mutation({
            query: (id) => ({
                url: `Cuisine/DeleteCuisine/${id}`,
                method: "PUT",
            }),
            async onQueryStarted(
                id, { dispatch, queryFulfilled }
            ) {
                const patch = dispatch(cuisineApi.util.updateQueryData("getCuisine", id, (draft) => {
                    return draft.filter((item) => item.id !== id)
                }));
                try {
                    await queryFulfilled;
                }
                catch {
                    patch.undo();
                }
            },
            invalidatesTags: [{ type: "Cuisine", id: "LIST" }]
        })

    })
})

export const {
    useGetCuisinesQuery,
    useGetCuisineQuery,
    useAddCuisineMutation,
    useUpdateCuisineMutation,
    useDeleteCuisineMutation,
} = cuisineApi;