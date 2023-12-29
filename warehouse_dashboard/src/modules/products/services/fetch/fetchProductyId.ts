import apiCall from "../../../../shared/axios/apiCall";

export const fetchProductById = async (id:number) =>{
    try {
        const response = await apiCall.get(`/product/get/${id}`);
        return response.data.products;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
}