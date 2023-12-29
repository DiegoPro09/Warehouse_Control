import apiCall from "../../../../shared/axios/apiCall"

export const fetchWarehouseById = async (id:number) =>{
    try {
        const response = await apiCall.get(`/warehouse/get/${id}`);
        return response.data.warehouse;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
}