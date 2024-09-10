import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthResponse, LoginRequest, RegisterRequest } from "../models/authModels";
import { baseUrl } from "../constants";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}` }), 
    endpoints: (builder) => ({
        
      register: builder.mutation<void, RegisterRequest>({
        query: (registerData) => ({
          url: 'register',
          method: 'POST',
          body: registerData,
        }),
      }),
  

      login: builder.mutation<AuthResponse, LoginRequest>({
        query: (loginData) => ({
          url: 'login',
          method: 'POST',
          body: loginData,
        }),
      }),
    }),
  });
  
  export const { useRegisterMutation, useLoginMutation } = authApi;