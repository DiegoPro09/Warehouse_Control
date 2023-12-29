import { useQuery } from "@tanstack/react-query"
import { productCacheKeys } from "../productCacheKeys"
import { fetchProductById } from "../../services/fetch/fetchProductyId"

export const useProductById = (id:number) => {
    const cacheKey = productCacheKeys.byId(id)
    
    const warehouseById = useQuery({
        queryKey: cacheKey,
        queryFn: () => fetchProductById(id)
    })

    return warehouseById 
}