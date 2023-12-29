import apiCall from "../../../../shared/axios/apiCall";

export const fetchAllProducts = async () => {
    try {
        const response = await apiCall.get(`/products/show`);
        return response.data.products;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
};