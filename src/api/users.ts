import axios, { AxiosResponse } from "axios";

export const baseUrl = "http://10.0.2.2:3000";

//Type interface for Registering User
export interface RegisterUserPayload {
    name: string;
    email: string;
    password: string;
}

export interface RegisterUserResponse {
    id: string;
    name: string;
    email: string;
}

//Type interface for logging in a user
export interface LoginPayLoad {
    email: string;
    password: string;
}

export interface LoginResponse {
    name: string;
    token: string;
}

export const registerUser = (
    data: RegisterUserPayload
): Promise<AxiosResponse<RegisterUserResponse>> => {
    return axios({
        method: "post",
        url: `${baseUrl}/user/register`,
        data,
    });
};

export const loginUser = (
    data: LoginPayLoad
): Promise<AxiosResponse<LoginResponse>> => {
    return axios({
        method: "post",
        url: `${baseUrl}/user/login`,
        data,
    });
};
