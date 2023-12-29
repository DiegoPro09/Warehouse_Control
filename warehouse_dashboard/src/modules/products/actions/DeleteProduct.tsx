import { Button, Modal, Tooltip, message } from "antd";
import { Product } from "../../../domain/models/Product";
import { useState } from "react";
import { useAction } from "../../../shared/hooks/useAction";
import { ReactQueryClient } from "../../../shared/ReactQuery/QueryClient";
import { productCacheKeys } from "../cache/productCacheKeys";
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { deleteProductService } from "../services/deleteProductService";

const { confirm } = Modal;

export const DeleteProduct:React.FC<{product:Product['id']}>= ({product}) => {
    const [, setErr] = useState("")

    //Actualiza los datos en la DB
    const {action} = useAction({
        key:'delete',
        fn:(data:Product['id'])=> deleteProductService(data),
        onSuccess:()=>{
            message.success('Producto eliminado correctamente!')
            ReactQueryClient.invalidateQueries({queryKey:productCacheKeys.all()})
        },
        onError:(error)=>{
            message.error(error.message)
            setErr(error.message) 
        }
    })

    const showConfirm = () => {
        confirm({
            title: 'Seguro que desea eliminar este producto?',
            icon: <ExclamationCircleFilled />,
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                action(product)
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