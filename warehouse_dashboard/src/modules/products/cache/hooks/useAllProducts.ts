import { useQuery } from "@tanstack/react-query"
import { Product } from "../../../../domain/models/Product"
import { fetchAllProducts } from "../../services/fetch/fetchAllProducts"
import { productCacheKeys } from "../productCacheKeys"

export const useAllProducts = () => {
    const cacheKey = productCacheKeys.all()
    
    const allProducts = useQuery<Product[]>({
        queryKey: cacheKey,
        queryFn: fetchAllProducts
    })

    return allProducts
}