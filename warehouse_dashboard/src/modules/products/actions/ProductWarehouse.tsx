import { EyeOutlined } from "@ant-design/icons"
import { CustomModal } from "../../../components/Modal/CustomModal"
import { Skeleton } from "antd"
import { CustomTable } from "../../../components/Table/CustomTable"
import { productsWarehouseColumns } from "../ProductColumns"
import { useWarehouseProduct } from "../cache/hooks/useWarehouseProduct"

export const ProductWarehouse:React.FC<{ id:number }> = ({ id }) => {
    const { data:warehouses, isLoading } = useWarehouseProduct(id)
    const columns = productsWarehouseColumns

    const handleAction = () =>{
        return true
    }

    return (
        <CustomModal 
            placement="bottom"
            shape="default"
            buttonTitle="Ver almacenes relacionado"
            title="Se encuentra en estos almacenes"
            action={handleAction} 
            tooltiptitle="Ver almacenes" 
            icon={ <EyeOutlined/> } 
            actionTitle="Guardar"
            actionButtons={<></>}
        >
            {isLoading || !warehouses ? <Skeleton/> :<CustomTable data={warehouses?.data.product.warehouse} columns={columns} />}
        </CustomModal>
    )
}