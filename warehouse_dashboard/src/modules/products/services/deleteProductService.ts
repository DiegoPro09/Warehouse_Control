import apiCall from "../../../shared/axios/apiCall"

export const deleteProductService = (id:number) =>{
    return apiCall.delete(`/products/delete/${id}`)
}