import { Button, Form, message } from "antd"
import { useProductById } from "../cache/hooks/useProductById"
import { createProductsReq } from "../services/createProductService"
import { useState } from "react"
import { ProductsFormFields } from "../../../shared/configs/formFields"
import { useAction } from "../../../shared/hooks/useAction"
import { updateProducteService } from "../services/updateProductService"
import { ReactQueryClient } from "../../../shared/ReactQuery/QueryClient"
import { productCacheKeys } from "../cache/productCacheKeys"
import { CustomModal } from "../../../components/Modal/CustomModal"
import { ArrowUpOutlined } from "@ant-design/icons"
import { CustomForm } from "../../../components/Form/CustomForm"
import { useAllCategories } from "../../categories/cache/hooks/useAllCategories"

export const UpdateProduct:React.FC<{id:number}> = ({id}) => {
    const { data:categories } = useAllCategories()
    const categoriesOptions = categories?.map((category) => { return {value: category.id, label: category.name_category} } )
    const { data:product } = useProductById(id)
    const [form] = Form.useForm<createProductsReq>()
    const [, setErr] = useState("")
    
    const product_fields = ProductsFormFields()

    const {action, reset} = useAction({
        key:'update',
        fn:(data:createProductsReq)=> updateProducteService(product.id, data),
        onSuccess:()=>{
            message.success('Producto actualizado correctamente!')
            ReactQueryClient.invalidateQueries({queryKey: productCacheKeys.all()})
        },
        onError:(error)=>{
            message.error(error.message)
            setErr(error.message) 
        }
    })

    const handleAction = async () => {
        try {
            const data = await form.validateFields();
            action(data);
        } catch (error) {
            console.error("Error al validar campos:", error);
        }
    };
    
    const handleReset = () =>{
        form.resetFields()
        reset()
        setErr('')
    }

    const handleCChange = (data:[]) =>{
        return data
    }

    return (
        <CustomModal 
            title="Actualizar producto"
            shape="default"
            buttonTitle="Actualizar"
            placement="left"
            action={handleAction} 
            onClose={handleReset}
            tooltiptitle="Actualizar producto" 
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
            <CustomForm fields={product_fields} handleCChange={handleCChange} selectCOptions={categoriesOptions} form={form} values={product} update={true}/>
        </CustomModal>
    )
}