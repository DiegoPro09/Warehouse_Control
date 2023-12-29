import apiCall from "../../../../shared/axios/apiCall"

export const fetchAllCategories = async () => {
    try {
        const response = await apiCall.get(`/categories/show`);
        return response.data.categories;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
};