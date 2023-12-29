import { useState } from "react"
import { Category } from "../../../domain/models/Category"
import { useAction } from "../../../shared/hooks/useAction"
import { deleteCategoryService } from "../services/deleteCategoryService"
import { Button, Modal, Tooltip, message } from "antd"
import { DeleteOutlined, ExclamationCircleFilled } from "@ant-design/icons"
import { ReactQueryClient } from "../../../shared/ReactQuery/QueryClient"
import { categoryCacheKeys } from "../cache/categoryCacheKeys"
const { confirm } = Modal;

export const DeleteCategory:React.FC<{category:Category['id']}>= ({category}) => {
    const [, setErr] = useState("")

    //Actualiza los datos en la DB
    const {action} = useAction({
        key:'delete',
        fn:(categoryData:Category['id'])=> deleteCategoryService(categoryData),
        onSuccess:()=>{
            message.success('Categoria eliminada correctamente!')
            ReactQueryClient.invalidateQueries({queryKey:categoryCacheKeys.all()})
        },
        onError:(error)=>{
            message.error(error.message)
            setErr(error.message) 
        }
    })

    const showConfirm = () => {
        confirm({
            title: 'Seguro que desea eliminar esta categoria?',
            icon: <ExclamationCircleFilled />,
            okText: 'Si',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                action(category)
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