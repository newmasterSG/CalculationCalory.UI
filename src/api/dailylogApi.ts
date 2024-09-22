
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from "./basesQueries/baseQueryWithReauth";
import { AddProductToDailyLogCommand } from "./commands/dailyLog/AddProductToDailyLogCommand";
import { DeleteProductFromDailyLogByUserCommand } from './commands/dailyLog/DeleteProductFromDailyLogByUserCommand';

export const dailyLogApi = createApi({
    reducerPath: 'dailyLog',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        addMealItemToLog: builder.mutation<void, AddProductToDailyLogCommand>({
            query: (mealItem) => ({
                url: '/dailylog/add-product',
                method: 'POST',
                body: mealItem,
            }),
        }),
        removeMealItemFromServer: builder.mutation<boolean, DeleteProductFromDailyLogByUserCommand>({
            query: (command) => ({
                url: `/dailylog/delete-product`,
                method: 'DELETE',
                body: command,
            }),
        }),
    }),
});

export const { useAddMealItemToLogMutation } = dailyLogApi