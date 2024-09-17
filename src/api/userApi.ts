import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./basesQueries/baseQueryWithReauth";
import { UpdateUserCommand } from "./commands/user/UpdateUserCommand";

export const userApi = createApi({
    reducerPath: 'user',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        userProfileUpdate: builder.mutation<boolean, UpdateUserCommand>({
            query: (command) => ({
                url: '/user',
                method: 'PATCH',
                body: command,
            }),
        }),
    }),
})

export const { useUserProfileUpdateMutation } = userApi