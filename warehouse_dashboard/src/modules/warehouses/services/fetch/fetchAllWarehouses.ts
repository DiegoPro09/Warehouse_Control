import apiCall from "../../../../shared/axios/apiCall"

export const fetchAllWarehouses = async () => {
    try {
        const response = await apiCall.get(`/warehouses/show`);
        return response.data.warehouses;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
};