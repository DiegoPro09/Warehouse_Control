import { Button, Form, message } from "antd"
import { useState } from "react"
import { WarehousesFormFields } from "../../../shared/configs/formFields"
import { useAction } from "../../../shared/hooks/useAction"
import { createWarehouseReq, createWarehouseService } from "../services/createWarehouseService"
import { ReactQueryClient } from "../../../shared/ReactQuery/QueryClient"
import { warehouseCacheKeys } from "../cache/warehouseCacheKeys"
import { CustomModal } from "../../../components/Modal/CustomModal"
import { PlusOutlined } from "@ant-design/icons"
import { CustomForm } from "../../../components/Form/CustomForm"

export const CreateWarehouse:React.FC = () => {
    const [form] = Form.useForm<createWarehouseReq>()
    const [, setErr] = useState("")

    const warehouse_fields = WarehousesFormFields()

    const {action, reset} = useAction<createWarehouseReq, unknown>({
        key:'warehouses',
        fn:(data)=> createWarehouseService(data),
        onSuccess:()=>{
            message.success('Almacen creado correctamente!')
            ReactQueryClient.invalidateQueries({queryKey: warehouseCacheKeys.all()})
            handleReset()
            form.resetFields()
        },
        onError:(error:Error)=>{
            message.error(error.message)
            setErr(error.message) 
        }
    })

    const handleAction = async() => {
        await form.validateFields()
        .then((data) => {
            action(data)
        })
    };
    
    const handleReset = () =>{
        form.resetFields()
        reset()
        setErr('')
    }

    const closeModal = () =>{
        return true
    }

    return (
        <CustomModal 
            placement="bottom"
            shape="default"
            buttonTitle="Nuevo almacen"
            title="Nuevo almacen"
            action={handleAction} 
            tooltiptitle="Crear nuevo almacen" 
            icon={ <PlusOutlined/> } 
            actionTitle="Guardar"
            onClose={closeModal}
            actionButtons={
                <>
                    <Button type="primary" onClick={handleAction}>
                        Guardar
                    </Button>
                </>
            }
        >
            <CustomForm fields={warehouse_fields} form={form}/>
        </CustomModal>
    )
}