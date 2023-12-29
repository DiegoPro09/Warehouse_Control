import apiCall from "../../../shared/axios/apiCall"

export const logoutService = () =>{
    return apiCall.post('/logout').then(response => response.data)
}