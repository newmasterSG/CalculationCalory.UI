import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./basesQueries/baseQueryWithReauth";
import { NutrientData, Nutrients } from "../models/nutrientData";
import { NutrionDTO } from "./apiResponses/NutrionDTO";

export type DailyPlanResponse = [NutrientData[], number];

export const nutritionApi = createApi({
    reducerPath: 'nutrition',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getDailyPlan: builder.query<DailyPlanResponse, void>({
            query: () => ({
                url: '/nutrion/getNutrionByUser',
                method: 'GET',
            }),
            transformResponse: (response: NutrionDTO) => {

                const transformedData: NutrientData[] = [
                    { name: Nutrients.PROTEIN, value: 0, maxValue : response.protein },
                    { name: Nutrients.FAT, value: 0, maxValue : response.fat},
                    { name: Nutrients.Carbs, value: 0, maxValue : response.carb },
                ];

                return [transformedData, response.dailyCalories];
            },
        }),
    }),
})

export const { useGetDailyPlanQuery } = nutritionApi