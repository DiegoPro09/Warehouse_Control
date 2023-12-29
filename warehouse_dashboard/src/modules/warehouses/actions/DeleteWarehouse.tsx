import { Button, Modal, Tooltip, message } from "antd";
import { Warehouse } from "../../../domain/models/Warehouse";
import { useState } from "react";
import { useAction } from "../../../shared/hooks/useAction";
import { deleteWarehouseService } from "../services/deleteWarehouseService";
import { ReactQueryClient } from "../../../shared/ReactQuery/QueryClient";
import { warehouseCacheKeys } from "../cache/warehouseCacheKeys";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

export const DeleteWarehouse:React.FC<{warehouse:Warehouse['id']}>= ({warehouse}) => {
    const [, setErr] = useState("")

    //Actualiza los datos en la DB
    const {action} = useAction({
        key:'delete',
        fn:(data:Warehouse['id'])=> deleteWarehouseService(data),
        onSuccess:()=>{
            message.success('Almacen eliminado correctamente!')
            ReactQueryClient.invalidateQueries({queryKey:warehouseCacheKeys.all()})
        },
        onError:(error)=>{
            message.error(error.message)
            setErr(error.message) 
        }
    })

    const showConfirm = () => {
        confirm({
            title: 'Seguro que desea eliminar este almacen?',
            icon: <ExclamationCircleFilled />,
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                action(warehouse)
            }
        });
    };

    return (
        <>
            <Tooltip placement="right" title={'Eliminar'}>
                <Button shape="default" danger onClick={showConfirm}>
                    <DeleteOutlined /> Eliminar
                </Button>
            </Tooltip>
        </>
    )
}