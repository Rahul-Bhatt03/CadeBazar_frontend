import { FoodItem } from "./FoodItem.types";

export interface FoodCuisine{
    foodCuisine:number,
    name:string,
    foodItems:FoodItem[],
    isActive:boolean
}