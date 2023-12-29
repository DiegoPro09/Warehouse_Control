import { User } from "../../../domain/models/User";
import apiCall from "../../../shared/axios/apiCall"
//import apiCall from "../../../shared/axios/apiCall"

export interface loginReq {
    email:string,
    password:string,
}

export interface AuthRes {
    user:User
    data:string,
    token: string
}

export const loginService = async (data: loginReq) => {
    try {
        const response = await apiCall.post<AuthRes>('/login', data);
        const user = response.data;
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
  