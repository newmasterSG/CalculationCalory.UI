import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../mainStore";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            // Сохраняем токены в localStorage
            localStorage.setItem('accessToken', state.accessToken);
            localStorage.setItem('refreshToken', state.refreshToken);
        },
        clearTokens(state) {
            state.accessToken = null;
            state.refreshToken = null;
            // Удаляем токены из localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
});

export const { setTokens, clearTokens } = authSlice.actions;

export const selectAuth = (state: RootState) => ({
    accessToken: state.auth.accessToken,
    refreshToken: state.auth.refreshToken,
});

export default authSlice.reducer;