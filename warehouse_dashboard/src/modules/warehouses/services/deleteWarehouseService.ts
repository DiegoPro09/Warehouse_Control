import apiCall from "../../../shared/axios/apiCall"

export const deleteWarehouseService = (id:number) =>{
    return apiCall.delete(`/warehouse/delete/${id}`)
}