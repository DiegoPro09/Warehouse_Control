import { useQuery } from "@tanstack/react-query"
import { categoryCacheKeys } from "../categoryCacheKeys"
import { fetchCategoryById } from "../../services/fetch/fetchCategoryById"

export const useCategoryById = (id:number) => {
    const cacheKey = categoryCacheKeys.byId(id)
    
    const categoryById = useQuery({
        queryKey: cacheKey,
        queryFn: () => fetchCategoryById(id)
    })

    return categoryById
}