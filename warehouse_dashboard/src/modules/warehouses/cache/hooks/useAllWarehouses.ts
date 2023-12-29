import { useQuery } from "@tanstack/react-query"
import { Warehouse } from "../../../../domain/models/Warehouse"
import { warehouseCacheKeys } from "../warehouseCacheKeys"
import { fetchAllWarehouses } from "../../services/fetch/fetchAllWarehouses"

export const useAllWarehouses = () => {
    const cacheKey = warehouseCacheKeys.all()
    
    const allCategories = useQuery<Warehouse[]>({
        queryKey: cacheKey,
        queryFn: fetchAllWarehouses
    })

    return allCategories
}