import { createAsyncThunk } from "@reduxjs/toolkit";
import { mapToDeleteProductDTO } from "../helpers/mapperHelper";
import { DeleteProductFromDailyLogByUserCommand } from "../api/commands/dailyLog/DeleteProductFromDailyLogByUserCommand";
import { MealItem, MealType, MealTypeNumbers } from "../models/mealItem";
import {
  getProductByMealType,
  removeMealItem,
} from "../store/slicers/mealSlicer";
import { dailyLogApi } from "../api/dailylogApi";
import { RootState } from "../store/mainStore";

export const removeMealDailyLogAsync = createAsyncThunk(
  "meals/removeMealDailyLogAsync",
  async (payload: { type: MealType; id: number }, { dispatch, getState }) => {
    const state = getState() as RootState;

    const product = getProductByMealType(state, payload.type, payload.id);
    dispatch(removeMealItem(payload));

    const deleteProductDTO = mapToDeleteProductDTO(
      product?.id ?? 0,
      MealTypeNumbers[payload.type],
      new Date()
    );

    const deleteProductCommand: DeleteProductFromDailyLogByUserCommand = {
      dto: deleteProductDTO,
    };

    try {
      await dispatch(
        dailyLogApi.endpoints.removeMealItemFromServer.initiate(
          deleteProductCommand
        )
      );
    } catch {}
  }
);
