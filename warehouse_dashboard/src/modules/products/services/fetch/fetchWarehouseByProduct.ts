import apiCall from "../../../../shared/axios/apiCall";

export const fetchWarehouseByProduct = async (id:number) =>{
    try {
        const response = await apiCall.get(`/products/show/warehouses/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
}