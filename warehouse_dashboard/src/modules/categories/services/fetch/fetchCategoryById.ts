import apiCall from "../../../../shared/axios/apiCall"

export const fetchCategoryById = async (id:number) =>{
    try {
        const response = await apiCall.get(`/categories/get/${id}`);
        return response.data.categories;
    } catch (error) {
        console.error('Error fetching all categories:', error);
        throw error;
    }
}