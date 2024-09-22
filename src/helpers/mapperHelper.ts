import { AddProductToDailyLogCommand } from "../api/commands/dailyLog/AddProductToDailyLogCommand";
import { DeleteProductDTO } from "../api/commands/dailyLog/DeleteProductFromDailyLogByUserCommand";
import { MealItem, MealType } from "../models/mealItem";

export function getEnumByLabel<T extends string | number>(
  label: string,
  enumLabels: { [key in T]: string }
): T | undefined {
  const entry = Object.entries(enumLabels).find(([key, value]) => value === label);
  return entry ? (parseInt(entry[0], 10) as T) : undefined;
}


export const mapMealItemToAddProductCommand = (
  mealItem: MealItem,
  quantity: number,
  mealType: number,
  date: Date
): AddProductToDailyLogCommand => {
  return {
    dto: {
      productId: mealItem.id,
      quantity: quantity,
      date: date,
      mealType: mealType
    }
  };
};

export function mapToDeleteProductDTO(
  mealItemId: number, 
  mealType: number, 
  date: Date
): DeleteProductDTO {
  return {
      productId: mealItemId,
      mealType: mealType,
      creationDate: date,
  };
}