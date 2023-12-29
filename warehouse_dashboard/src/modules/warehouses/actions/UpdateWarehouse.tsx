import { Button, Form, message } from "antd"
import { useWarehouseById } from "../cache/hooks/useWarehouseById"
import { createWarehouseReq } from "../services/createWarehouseService"
import { useState } from "react"
import { WarehousesFormFields } from "../../../shared/configs/formFields"
import { useAction } from "../../../shared/hooks/useAction"
import { updateWarehouseService } from "../services/updateWarehouseService"
import { ReactQueryClient } from "../../../shared/ReactQuery/QueryClient"
import { warehouseCacheKeys } from "../cache/warehouseCacheKeys"
import { CustomModal } from "../../../components/Modal/CustomModal"
import { ArrowUpOutlined } from "@ant-design/icons"
import { CustomForm } from "../../../components/Form/CustomForm"

export const UpdateWarehouse:React.FC<{id:number}> = ({id}) => {
    const { data:warehouse } = useWarehouseById(id)
    const [form] = Form.useForm<createWarehouseReq>()
    const [, setErr] = useState("")
    
    const warehouses_fields = WarehousesFormFields()

    const {action, reset} = useAction({
        key:'update',
        fn:(data:createWarehouseReq)=> updateWarehouseService(warehouse.id, data),
        onSuccess:()=>{
            message.success('Almacen actualizado correctamente!')
            ReactQueryClient.invalidateQueries({queryKey: warehouseCacheKeys.all()})
        },
        onError:(error)=>{
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

    return (
        <CustomModal 
            title="Actualizar almacen"
            shape="default"
            buttonTitle="Actualizar"
            placement="left"
            action={handleAction} 
            onClose={handleReset}
            tooltiptitle="Actualizar almacen" 
            icon={ <ArrowUpOutlined /> } 
            actionTitle="Actualizar"
            actionButtons={
                <>
                    <Button type="primary" onClick={handleAction}>
                        Actualizar
                    </Button>
                </>
            }
        >
            <CustomForm fields={warehouses_fields} form={form} values={warehouse}/>
        </CustomModal>
    )
}