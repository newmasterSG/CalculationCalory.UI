import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./basesQueries/baseQueryWithReauth";
import { AddProductToDailyLogCommand } from "./commands/dailyLog/AddProductToDailyLogCommand";
import { DeleteProductFromDailyLogByUserCommand } from "./commands/dailyLog/DeleteProductFromDailyLogByUserCommand";
import { MealItem, MealType } from "../models/mealItem";
import { GetDailyLogByUserQuery } from "./commands/dailyLog/GetDailyLogByUserQuery";
import { DailyLogDTO, FoodConsumptionDTO } from "../models/dailyLog";
import { getMealTypeByNumber } from "../helpers/mapperHelper";

export const dailyLogApi = createApi({
  reducerPath: "dailyLog",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addMealItemToLog: builder.mutation<void, AddProductToDailyLogCommand>({
      query: (mealItem) => ({
        url: "/dailylog/add-product",
        method: "POST",
        body: mealItem,
      }),
    }),
    removeMealItemFromServer: builder.mutation<
      boolean,
      DeleteProductFromDailyLogByUserCommand
    >({
      query: (command) => ({
        url: `/dailylog/delete-product`,
        method: "DELETE",
        body: command,
      }),
    }),
    getDailyLogByUser: builder.query<
      Record<MealType, MealItem[]>,
      GetDailyLogByUserQuery
    >({
      query: (command) => ({
        url: `/dailylog/by-user?date=${command.dto.date}`,
        method: "GET",
      }),
      transformResponse: (response: DailyLogDTO) => {
        const mealsState: Record<MealType, MealItem[]> = {
          [MealType.BREAKFAST]: [],
          [MealType.LUNCH]: [],
          [MealType.DINNER]: [],
        };

        if (!response.foodConsumption) {
          return mealsState;
        }

        response.foodConsumption.forEach((consumption: FoodConsumptionDTO) => {
          const mealType = getMealTypeByNumber(consumption.mealType);
          const mealItems = consumption.products.map((product, index) => ({
            id: product.id,
            name: product.name,
            protein: product.protein,
            fat: product.fat,
            carb: product.carb,
            quantity: product.quantity,
            calories: product.calories,
            uniqueId: index,
          }));

          mealsState[mealType] = [...mealsState[mealType], ...mealItems];
        });

        return mealsState;
      },
    }),
  }),
});

export const { useAddMealItemToLogMutation, useGetDailyLogByUserQuery } =
  dailyLogApi;
