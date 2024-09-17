import { configureStore } from '@reduxjs/toolkit'
import mealSlicer from './slicers/mealSlicer';
import { productApi } from '../api/productApi';
import { authApi } from '../api/authApi';
import authSlice from './slicers/authSlice';
import { userApi } from '../api/userApi';

const store = configureStore({
    reducer: {
        meals: mealSlicer,
        [productApi.reducerPath] : productApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
        auth: authSlice,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware, authApi.middleware, userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;

export default store;