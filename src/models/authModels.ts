export interface RegisterRequest {
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
    twoFactorCode?: string;
    twoFactorRecoveryCode?: string;
}

export interface AuthResponse {
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
}