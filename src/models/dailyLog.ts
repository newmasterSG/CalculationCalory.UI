import { ProductDTO } from "./product";

export interface FoodConsumptionDTO {
    products: ProductDTO[];
    mealType: number; 
    quantity: number;
}

export interface DailyLogDTO {
    id: number;  
    foodConsumption: FoodConsumptionDTO[];
}