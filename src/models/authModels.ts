import { Gender } from "./user";

export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    confirmPassword: string;
    height: number;
    weight: number;
    age: number;
    gender: Gender;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
}