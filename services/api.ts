import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { User } from "@/types/auth";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
    baseURL,
    withCredentials: true,
});

type RetryableRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const request = error.config as RetryableRequestConfig | undefined;
        const isAuthRequest = request?.url?.includes("/auth/");

        if (error.response?.status !== 401 || !request || request._retry || isAuthRequest) {
            return Promise.reject(error);
        }

        request._retry = true;

        return api.post<RefreshResponse>("/auth/refresh")
            .then(() => api(request));
    },
);

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
};

export interface LoginRequest {
    email: string;
    password: string;
};

export const register = async (credentials: RegisterRequest): Promise<User> => {
    const { data } = await api.post<User>("/auth/register", credentials);
    return data;
};

export const login = async (credentials: LoginRequest): Promise<User> => {
    const { data } = await api.post<User>("/auth/login", credentials);
    return data;
};

export const logout = async (): Promise<void> => {
    await api.post("/auth/logout");
};

export interface RefreshResponse {
    message: string;
};

export const refreshSession = async (): Promise<RefreshResponse> => {
    const { data } = await api.post<RefreshResponse>("/auth/refresh");
    return data;
};