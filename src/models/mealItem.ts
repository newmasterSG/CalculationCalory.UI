export enum MealType {
    BREAKFAST = 'Breakfast',
    LUNCH = 'Lunch',
    DINNER = 'Dinner',
}

export interface MealItem {
    id: number;
    name: string;
    protein: number;
    fat: number;
    carb: number;
}