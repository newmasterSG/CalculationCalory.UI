import { configureStore } from '@reduxjs/toolkit'
import mealSlicer from './slicers/mealSlicer';

const store = configureStore({
    reducer: {
        meals: mealSlicer,
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;

export default store;