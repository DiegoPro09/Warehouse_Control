import { Skeleton } from "antd"
import { AppContent } from "../app/content/AppContent"
import { AppLayout } from "../app/layout/AppLayout"
import { CustomTable } from "../../components/Table/CustomTable"
import { useAllWarehouses } from "./cache/hooks/useAllWarehouses"
import { warehousesColumns } from "./WarehousesColumns"
import { CreateWarehouse } from "./actions/CreateWarehouse"

export const WarehousePage:React.FC = () =>{
    const { data:warehouses, isLoading } = useAllWarehouses()
    const columns = warehousesColumns

    const primaryActions = [
        <CreateWarehouse />
    ]
    
    return (
        <AppLayout>
            <AppContent title="Almacenes" primaryActions={primaryActions}>
                <div style={{margin: 25}}>
                    {isLoading ? <Skeleton/> :<CustomTable data={warehouses} columns={columns} />}
                </div>
            </AppContent>
        </AppLayout>
    )
}