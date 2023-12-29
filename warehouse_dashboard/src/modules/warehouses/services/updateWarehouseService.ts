import apiCall from "../../../shared/axios/apiCall"

export interface updateWarehouseReq {
    name_warehouse:string,
    description?:string
}

export const updateWarehouseService = (id:number, data:updateWarehouseReq) =>{
    return apiCall.put(`/warehouse/update/${id}`, data)
}