import { createApi } from '@reduxjs/toolkit/query/react';
import { CreateProductCommand, ProductDTO } from '../models/product';
import { baseQueryWithReauth } from './basesQueries/baseQueryWithReauth';

export const productApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getProducts: builder.query<ProductDTO[], void>({
            query: () => 'products',
        }),

        createProduct: builder.mutation<ProductDTO, CreateProductCommand>({
            query: (command) => ({
                url: 'products',
                method: 'POST',
                body: command,
            }),
        }),
    }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productApi;