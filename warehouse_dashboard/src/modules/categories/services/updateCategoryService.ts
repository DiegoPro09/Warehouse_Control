import apiCall from "../../../shared/axios/apiCall"

export interface updateCategoryReq {
    name_category:string
}

export const updateCategoryService = (id:number, data:updateCategoryReq) =>{
    return apiCall.put(`/categories/update/${id}`, data)
}