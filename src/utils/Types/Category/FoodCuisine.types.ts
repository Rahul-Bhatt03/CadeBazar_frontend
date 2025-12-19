import { FoodItem } from "./FoodItem.types";

export interface FoodCuisine{
    foodCuisineId:number,
    name:string,
    foodItems:FoodItem[],
    isActive:boolean,
   
}