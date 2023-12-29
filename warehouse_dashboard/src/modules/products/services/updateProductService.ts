import apiCall from "../../../shared/axios/apiCall"
import { createProductsReq } from "./createProductService"

export const updateProducteService = (id:number, data:createProductsReq) =>{
    return apiCall.put(`/products/update/${id}`, data)
}