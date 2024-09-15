import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../../store/mainStore';
import { baseUrl } from '../../constants';
import { AuthResponse } from '../../models/authModels';
import { clearTokens, setTokens } from '../../store/slicers/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrl}`,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken || localStorage.getItem('accessToken');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});


export const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      const { refreshToken, accessToken } = (api.getState() as RootState).auth;
  
      if (refreshToken) {
        const refreshResult = await baseQuery(
          {
            url: 'auth/refresh-token',
            method: 'POST',
            body: {
              refreshToken,
              accessToken,
            } as AuthResponse,
          },
          api,
          extraOptions
        );
  
        if (refreshResult.data) {
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResult.data as AuthResponse;
  
          api.dispatch(setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken }));
  
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(clearTokens());
        }
      } else {
        api.dispatch(clearTokens());
      }
    }
  
    return result;
  };