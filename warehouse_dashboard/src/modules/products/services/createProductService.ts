import { Warehouse } from "../../../domain/models/Warehouse"
import apiCall from "../../../shared/axios/apiCall"

export interface createProductsReq {
    name_product:string,
    price:number,
    observations?:string,
    warehouses?: [
        {id: Warehouse['id']}
    ],
    id_category?:number
}

export const createProductService = (data:createProductsReq) =>{
    return apiCall.post('/products/create', data)
}