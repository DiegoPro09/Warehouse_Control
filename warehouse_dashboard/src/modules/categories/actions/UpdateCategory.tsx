import { ArrowUpOutlined } from "@ant-design/icons"
import { Button, Form, message } from "antd"
import { useState } from "react"
import { CustomModal } from "../../../components/Modal/CustomModal"
import { CustomForm } from "../../../components/Form/CustomForm"
import { CategoriesFormFields } from "../../../shared/configs/formFields"
import { createCategoryReq } from "../services/createCategoryService"
import { useAction } from "../../../shared/hooks/useAction"
import { useCategoryById } from "../cache/hooks/useCategoryById"
import { updateCategoryReq, updateCategoryService } from "../services/updateCategoryService"
import { ReactQueryClient } from "../../../shared/ReactQuery/QueryClient"
import { categoryCacheKeys } from "../cache/categoryCacheKeys"

export const UpdateCategory:React.FC<{id:number}> = ({id}) => {
    const { data:category } = useCategoryById(id)
    const [form] = Form.useForm<createCategoryReq>()
    const [, setErr] = useState("")
    
    const category_fields = CategoriesFormFields()

    const {action, reset} = useAction({
        key:'update',
        fn:(categoryData:updateCategoryReq)=> updateCategoryService(category.id, categoryData),
        onSuccess:()=>{
            message.success('Categoria actualizada correctamente!')
            ReactQueryClient.invalidateQueries({queryKey: categoryCacheKeys.all()})
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
            title="Actualizar categoria"
            shape="default"
            buttonTitle="Actualizar"
            placement="left"
            action={handleAction} 
            onClose={handleReset}
            tooltiptitle="Actualizar categoria" 
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
            <CustomForm fields={category_fields} form={form} values={category}/>
        </CustomModal>
    )
}