import { createAsyncThunk } from "@reduxjs/toolkit";
import { MealItem, MealType, MealTypeNumbers } from "../models/mealItem";
import { addMealItem } from "../store/slicers/mealSlicer";
import { dailyLogApi } from "../api/dailylogApi";
import { mapMealItemToAddProductCommand } from "../helpers/mapperHelper";
import { AddProductToDailyLogCommand } from "../api/commands/dailyLog/AddProductToDailyLogCommand";
import { baseGrammPerDish } from "../constants";

export const addMealDailyLogAsync = createAsyncThunk(
    'meals/addMealDailyLogAsync',
    async (payload: { type: MealType; item: MealItem }, { dispatch }) => {

        dispatch(addMealItem(payload));

        const command: AddProductToDailyLogCommand = mapMealItemToAddProductCommand(payload.item, baseGrammPerDish, MealTypeNumbers[payload.type], new Date());

        try {
            await dispatch(dailyLogApi.endpoints.addMealItemToLog.initiate(command));
        }
        catch {

        }
    }
);