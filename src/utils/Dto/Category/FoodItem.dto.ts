export interface CreateFoodItem {
    foodName: string;
    price: number | string;
    quantity: number | null;
    subFoodCategoryId: string;
    cuisineId: number;
    foodImageUrl: string;
    ratings: number;
    description: string;
    lovedBy: number;
    discountPercentage: number;
    isActive: boolean;
}

export interface UpdateFoodItem {
    foodItemId: number
    foodName: string;
    price: number | string;
    quantity: number | null;
    subFoodCategoryId: string;
    cuisineId: number;
    foodImageUrl: string;
    ratings: number;
    description: string;
    lovedBy: number;
    discountPercentage: number;
    isActive: boolean;
}