import { PlusOutlined } from "@ant-design/icons"
import { Button, Form, message } from "antd"
import { useState } from "react"
import { CustomModal } from "../../../components/Modal/CustomModal"
import { CustomForm } from "../../../components/Form/CustomForm"
import { CategoriesFormFields } from "../../../shared/configs/formFields"
import { createCategoryReq, createCategoryService } from "../services/createCategoryService"
import { useAction } from "../../../shared/hooks/useAction"
import { ReactQueryClient } from "../../../shared/ReactQuery/QueryClient"
import { categoryCacheKeys } from "../cache/categoryCacheKeys"

export const CreateCategory:React.FC = () => {
    const [form] = Form.useForm<createCategoryReq>()
    const [, setErr] = useState("")

    const category_fields = CategoriesFormFields()

    const {action, reset} = useAction<createCategoryReq, unknown>({
        key:'categories',
        fn:(categoryData)=> createCategoryService(categoryData),
        onSuccess:()=>{
            message.success('Categoria creada correctamente!')
            ReactQueryClient.invalidateQueries({queryKey: categoryCacheKeys.all()})
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
            buttonTitle="Nueva categoria"
            title="Nueva categoria"
            action={handleAction} 
            tooltiptitle="Crear nueva categoria" 
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
            <CustomForm fields={category_fields} form={form}/>
        </CustomModal>
    )
}