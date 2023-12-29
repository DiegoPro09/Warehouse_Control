import apiCall from "../../../shared/axios/apiCall"

export interface createWarehouseReq {
    name_warehouse:string,
    description?:string
}

export const createWarehouseService = (data:createWarehouseReq) =>{
    return apiCall.post('/warehouse/create', data)
}