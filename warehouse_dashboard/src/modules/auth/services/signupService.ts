import { User } from "../../../domain/models/User"
import apiCall from "../../../shared/axios/apiCall"

export interface signupReq {
    name_user:string,
    lastname:string,
    email:string,
    password:string,
    password_confirmation:string
}

export interface AuthRes {
    user:User
}

export const signupService = (data:signupReq) =>{
    return apiCall.post('/signup', data).then(response => response.data)
}