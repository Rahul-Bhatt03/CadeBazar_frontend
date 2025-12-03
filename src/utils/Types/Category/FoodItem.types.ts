import { FoodCuisine } from "./FoodCuisine.types";
import { SubCategory } from "./SubCategory.types";

export interface FoodItem{
 
  foodItemId: number;
  foodName: string;
  price: number | string;
  quantity: number | null;
  subFoodCategoryId: string;
  subFoodCategory: SubCategory | null;
  cuisineId: number;
  foodCuisine: FoodCuisine | null;
  foodImageUrl: string;
  ratings: number;
  description: string;
  lovedBy: number;
  discountPercentage: number;
  isActive: boolean;

}