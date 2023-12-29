import { Skeleton } from "antd"
import { AppContent } from "../app/content/AppContent"
import { AppLayout } from "../app/layout/AppLayout"
import { productsColumns } from "./ProductColumns"
import { useAllProducts } from "./cache/hooks/useAllProducts"
import { CustomTable } from "../../components/Table/CustomTable"
import { CreateProduct } from "./actions/CreateProduct"
import { useAllCategories } from "../categories/cache/hooks/useAllCategories"

export const ProductPage:React.FC = () =>{
    const { data:products, isLoading } = useAllProducts()
    const { data:categories } = useAllCategories()
    const columns = productsColumns

    const data = products?.map((product) => {
        const productCategory = categories?.find((category) => category.id === product.id_category);
    
        return {
            ...product,
            category: productCategory?.name_category,
        };
    });

    const primaryActions = [ 
        <CreateProduct />
    ]
    
    return (
        <AppLayout>
            <AppContent title="Productos" primaryActions={primaryActions}>
                <div style={{margin: 25}}>
                    {isLoading || !products || !categories ? <Skeleton/> :<CustomTable data={data} columns={columns} />}
                </div>
            </AppContent>
        </AppLayout>
    )
}