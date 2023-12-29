import { useQuery } from "@tanstack/react-query"
import { productCacheKeys } from "../productCacheKeys"
import { fetchWarehouseByProduct } from "../../services/fetch/fetchWarehouseByProduct"

export const useWarehouseProduct = (id:number) => {
    const cacheKey = productCacheKeys.byWarehouse(id)
    
    const warehouseById = useQuery({
        queryKey: cacheKey,
        queryFn: () => fetchWarehouseByProduct(id)
    })

    return warehouseById 
}