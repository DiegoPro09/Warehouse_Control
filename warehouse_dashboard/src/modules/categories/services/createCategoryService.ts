import apiCall from "../../../shared/axios/apiCall"

export interface createCategoryReq {
    name_category:string
}

export const createCategoryService = (data:createCategoryReq) =>{
    return apiCall.post('/categories/create', data)
}