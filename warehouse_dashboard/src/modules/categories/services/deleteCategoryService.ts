import apiCall from "../../../shared/axios/apiCall"

export const deleteCategoryService = (id:number) =>{
    return apiCall.delete(`/categories/delete/${id}`)
}