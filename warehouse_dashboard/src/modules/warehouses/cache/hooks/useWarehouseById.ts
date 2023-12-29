import { useQuery } from "@tanstack/react-query"
import { warehouseCacheKeys } from "../warehouseCacheKeys"
import { fetchWarehouseById } from "../../services/fetch/fetchWarehouseById"

export const useWarehouseById = (id:number) => {
    const cacheKey = warehouseCacheKeys.byId(id)
    
    const warehouseById = useQuery({
        queryKey: cacheKey,
        queryFn: () => fetchWarehouseById(id)
    })

    return warehouseById 
}