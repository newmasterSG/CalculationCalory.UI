import { MealType } from "../models/mealItem";
import { Nutrients } from "../models/nutrientData";
import { RootState } from "../store/mainStore";

export const calculateTotalNutrient = (
  state: RootState,
  nutrient: Nutrients | string
): number => {
  const allMeals = [
    ...state.meals[MealType.BREAKFAST],
    ...state.meals[MealType.LUNCH],
    ...state.meals[MealType.DINNER],
  ];

  return allMeals.reduce(
    (sum, item) => sum + (item as any)[nutrient.toLowerCase()],
    0
  );
};
