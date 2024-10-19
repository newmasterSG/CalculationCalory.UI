import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MealItem, MealType } from "../../models/mealItem";
import CalculationHelper from "../../helpers/calculationHelper";

interface MealsState {
    [MealType.BREAKFAST]: MealItem[];
    [MealType.LUNCH]: MealItem[];
    [MealType.DINNER]: MealItem[];
    lastUsedId: { [MealType.BREAKFAST]: number;[MealType.LUNCH]: number;[MealType.DINNER]: number };
    generalCal: number;
    proteinCal: number;
    fatCal: number;
    carbCal: number;
    totalEatCal: number
}

const initialState: MealsState = {
    [MealType.BREAKFAST]: [],
    [MealType.LUNCH]: [],
    [MealType.DINNER]: [],
    lastUsedId: {
        [MealType.BREAKFAST]: 0,
        [MealType.LUNCH]: 0,
        [MealType.DINNER]: 0,
    },
    generalCal: 0,
    proteinCal: 0,
    fatCal: 0,
    carbCal: 0,
    totalEatCal: 0,
};

const mealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {
        setMealItems(state, action: PayloadAction<{ type: MealType; items: MealItem[] }>) {
            const { type, items } = action.payload;
            state[type] = items;
        },
        addMealItem(state, action: PayloadAction<{ type: MealType; item: MealItem }>) {
            const { type, item } = action.payload;
            state.totalEatCal += CalculationHelper.calculateCalories(item);

            const uniqueId = state.lastUsedId[type] + 1;
            state.lastUsedId[type] = uniqueId;

            state.proteinCal += item.protein;
            state.carbCal += item.carb;
            state.fatCal += item.fat;

            state[type].push(item);
        },
        removeMealItem(state, action: PayloadAction<{ type: MealType; id: number }>) {
            const { type, id } = action.payload;
            let item = state[type].find(item => item.uniqueId === id);
            if (!item) {
                return;
            }

            state.totalEatCal -= CalculationHelper.calculateCalories(item);
            state[type] = state[type].filter(item => item.uniqueId !== id);
        },
        addGeneralCal(state, action: PayloadAction<number>) {
            state.generalCal = action.payload;
        },
        changeEatenCal(state, action: PayloadAction<number>) {
            state.totalEatCal = action.payload;
        },
        removeGeneralCal(state, action: PayloadAction<number>) {
            if (state.generalCal <= 0) {
                return;
            }

            state.totalEatCal -= action.payload;
        }
    },
});

export const { setMealItems, addMealItem, removeMealItem, addGeneralCal, changeEatenCal } = mealsSlice.actions;
export default mealsSlice.reducer;