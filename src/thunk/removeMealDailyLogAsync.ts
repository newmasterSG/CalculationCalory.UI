import { createAsyncThunk } from "@reduxjs/toolkit";
import { mapToDeleteProductDTO } from "../helpers/mapperHelper";
import { DeleteProductFromDailyLogByUserCommand } from "../api/commands/dailyLog/DeleteProductFromDailyLogByUserCommand";
import { MealType, MealTypeNumbers } from "../models/mealItem";
import { removeMealItem } from "../store/slicers/mealSlicer";
import { dailyLogApi } from "../api/dailylogApi";

export const removeMealDailyLogAsync = createAsyncThunk(
    'meals/removeMealDailyLogAsync',
    async (payload: { type: MealType; id: number }, { dispatch }) => {

        dispatch(removeMealItem(payload));

        const deleteProductDTO = mapToDeleteProductDTO(payload.id, MealTypeNumbers[payload.type], new Date());

        const deleteProductCommand: DeleteProductFromDailyLogByUserCommand = {
            dto: deleteProductDTO,
        };

        try {
            await dispatch(dailyLogApi.endpoints.removeMealItemFromServer.initiate(deleteProductCommand));
        }
        catch {

        }
    }
);