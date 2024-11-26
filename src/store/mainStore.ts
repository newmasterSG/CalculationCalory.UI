import { configureStore } from "@reduxjs/toolkit";
import mealSlicer from "./slicers/mealSlicer";
import { productApi } from "../api/productApi";
import { authApi } from "../api/authApi";
import authSlice from "./slicers/authSlice";
import { userApi } from "../api/userApi";
import { nutritionApi } from "../api/nutritionApi";
import { dailyLogApi } from "../api/dailylogApi";
import applicationSlice from "./slicers/applicationSlice";

const store = configureStore({
  reducer: {
    meals: mealSlicer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
    [userApi.reducerPath]: userApi.reducer,
    [nutritionApi.reducerPath]: nutritionApi.reducer,
    [dailyLogApi.reducerPath]: dailyLogApi.reducer,
    app: applicationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
      nutritionApi.middleware,
      dailyLogApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;

export default store;
