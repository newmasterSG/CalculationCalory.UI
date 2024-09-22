export enum MealType {
    BREAKFAST = 'Breakfast',
    LUNCH = 'Lunch',
    DINNER = 'Dinner',
}

export const MealTypeNumbers = {
    [MealType.BREAKFAST]: 0,
    [MealType.LUNCH]: 1,
    [MealType.DINNER]: 2,
};

export interface MealItem {
    id: number;
    uniqueId?: number;
    name: string;
    protein: number;
    fat: number;
    carb: number;
}