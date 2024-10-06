import { caloryPerOneGramProtein, caloryPerOneGramFat, caloryPerOneGramCarb } from "../constants";
import { MealItem } from "../models/mealItem";

export default class CalculationHelper {
    
    public static calculateCalories(mealItem: MealItem): number {
        const proteinCalories = mealItem.protein * caloryPerOneGramProtein;
        const fatCalories = mealItem.fat * caloryPerOneGramFat;
        const carbCalories = mealItem.carb * caloryPerOneGramCarb;
        
        return proteinCalories + fatCalories + carbCalories;
    }

    public static calculateNormCaloriesPerPerson(totalCal: number, generalCalories: number) : number {
        return totalCal / generalCalories * 100;
    }
}