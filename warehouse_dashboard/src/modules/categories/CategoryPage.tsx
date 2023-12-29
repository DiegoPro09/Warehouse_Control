import { Skeleton } from "antd"
import { AppContent } from "../app/content/AppContent"
import { AppLayout } from "../app/layout/AppLayout"
import { categoriesColumns } from "./CategoriesColumns"
import { CreateCategory } from "./actions/CreateCategory"
import { useAllCategories } from "./cache/hooks/useAllCategories"
import { CustomTable } from "../../components/Table/CustomTable"

export const CategoryPage:React.FC = () =>{
    const { data:categories, isLoading } = useAllCategories()
    const columns = categoriesColumns

    const primaryActions = [
        <CreateCategory />
    ]
    
    return (
        <AppLayout>
            <AppContent title="Categorias" primaryActions={primaryActions}>
                <div style={{margin: 25}}>
                    {isLoading ? <Skeleton/> :<CustomTable data={categories} columns={columns} />}
                </div>
            </AppContent>
        </AppLayout>
    )
}