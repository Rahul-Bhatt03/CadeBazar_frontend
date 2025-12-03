import { SubCategory } from "@/src/utils/Types/Category/SubCategory.types";
import { mainApi } from "../mainApi";
import { createSubCat, updateSubCat } from "@/src/utils/Dto/Category/SubCategory.dto";

export const subCategoryApi = mainApi.injectEndpoints({
    endpoints: (builder) => ({

        getSubCategories: builder.query<SubCategory[],void>({
            query: () => ({
                url: "SubFoodCategory/GetSubCategories",
                method: "GET"
            }),
            providesTags: (result) => result ? [
                ...result.map((item) => ({ type: "SubCategory"as const, id: item.subFoodCategoryId, })),
                { type: "SubCategory"as const, id: "LIST" },
            ] : [{ type: "SubCategory"as const, id: "LIST" }],
        }),

        getSubCategory: builder.query<SubCategory,number>({
            query: (id) =>
            ({
                url: `SubFoodCategory/GetSubCatById/${id}`,
                method: "GET",
            }),
            providesTags: (_, __, id) => [
                { type: "SubCategory"as const, id }
            ],
        }),

        addSubCategory: builder.mutation<SubCategory,createSubCat>({
            query: (body) => ({
                url: "SubFoodCategory/createSubCat",
                method: "POST",
                data: body,
            }),
            invalidatesTags: [{ type: "SubCategory"as const, id: "LIST" }],
        }),

        updateSubCategory: builder.mutation<SubCategory,{id:number,body:updateSubCat}>({
            query: ({ id, body }) => ({
                url: `SubFoodCategory/updateSubCat/${id}`,
                method: "PUT",
                data: body,
            }),
            async onQueryStarted({ id, body }, { dispatch, queryFulfilled }) {
                const patch = dispatch(subCategoryApi.util.updateQueryData(
                    "getSubCategory", id, (draft) => {
                        Object.assign(draft, body);
                    }
                ));
                try {
                    await queryFulfilled;
                } catch {
                    patch.undo();
                }
            },
            invalidatesTags: (_, __, id) => [
                { type: "SubCategory"as const, id },
                { type: "SubCategory"as const, id: "LIST" }
            ],
        }),

        deleteSubCategory: builder.mutation<void,string>({
            query: (id:string) => ({
                url: `SubFoodCategory/deleteSubCat/${id}`,
                method: "PUT",

            }),
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patch = dispatch(
                    subCategoryApi.util.updateQueryData("getSubCategories", undefined, (draft) => {
                        return draft.filter((item) => item.subFoodCategoryId !== id);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patch.undo()
                }
            },

            invalidatesTags: (_, __, id) => [
                { type: "SubCategory", id },
                { type: "SubCategory", id: "LIST" }
            ],
        })
    })
})

export const {
    // Normal Queries
    useGetSubCategoriesQuery,
    useGetSubCategoryQuery,

    // Lazy Queries (ADVANCED)
    useLazyGetSubCategoriesQuery,
    useLazyGetSubCategoryQuery,

    // Mutations
    useAddSubCategoryMutation,
    useUpdateSubCategoryMutation,
    useDeleteSubCategoryMutation,
} = subCategoryApi;