import { useQuery } from "@tanstack/react-query"
import { Category } from "../../../../domain/models/Category"
import { categoryCacheKeys } from "../categoryCacheKeys"
import { fetchAllCategories } from "../../services/fetch/fetchAllCategories"

export const useAllCategories = () => {
    const cacheKey = categoryCacheKeys.all()
    
    const allCategories = useQuery<Category[]>({
        queryKey: cacheKey,
        queryFn: fetchAllCategories
    })

    return allCategories
}