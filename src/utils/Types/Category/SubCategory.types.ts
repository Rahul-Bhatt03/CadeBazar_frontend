import { Category } from "./Category.Types"

export interface SubCategory {
    subFoodCategoryId:string,
    subFoodCategoryName: string,
    isActive: boolean,
    foodCategoryId: number,
    foodCategory:Category|null
}