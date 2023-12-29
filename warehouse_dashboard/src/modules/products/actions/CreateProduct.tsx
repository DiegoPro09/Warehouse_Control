import { Button, Form, message } from "antd"
import { ProductsFormFields } from "../../../shared/configs/formFields"
import { useState } from "react"
import { useAction } from "../../../shared/hooks/useAction"
import { createProductService, createProductsReq } from "../services/createProductService"
import { ReactQueryClient } from "../../../shared/ReactQuery/QueryClient"
import { productCacheKeys } from "../cache/productCacheKeys"
import { CustomModal } from "../../../components/Modal/CustomModal"
import { PlusOutlined } from "@ant-design/icons"
import { CustomForm } from "../../../components/Form/CustomForm"
import { useAllCategories } from "../../categories/cache/hooks/useAllCategories"
import { useAllWarehouses } from "../../warehouses/cache/hooks/useAllWarehouses"

export const CreateProduct:React.FC = () => {
    const { data:categories } = useAllCategories()
    const { data:warehouses } = useAllWarehouses()
    const categoriesOptions = categories?.map((category) => { return {value: category.id, label: category.name_category} } )
    const warehousesOptions = warehouses?.map((warehouse) => { return {value: warehouse.id, label: warehouse.name_warehouse} } )

    const [form] = Form.useForm<createProductsReq>()
    const [, setErr] = useState("")

    const product_fields = ProductsFormFields()

    const {action, reset} = useAction<createProductsReq, unknown>({
        key:'products',
        fn:(data)=> createProductService(data),
        onSuccess:()=>{
            message.success('Producto creado correctamente!')
            ReactQueryClient.invalidateQueries({queryKey: productCacheKeys.all()})
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
            const warehouses = data.warehouses?.map((data) =>{
                return {
                    id:data
                }
            })

            data = {
                ...data,
                warehouses
            }
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

    const handleCChange = (data:[]) =>{
        return data
    }

    const handleWChange = (data:[]) =>{
        return data
    }

    return (
        <CustomModal
            placement="bottom"
            shape="default"
            buttonTitle="Nuevo producto"
            title="Nuevo product"
            action={handleAction} 
            tooltiptitle="Crear nuevo product" 
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
            <CustomForm fields={product_fields} form={form} handleCChange={handleCChange} handleWChange={handleWChange} selectCOptions={categoriesOptions} selectWOptions={warehousesOptions}/>
        </CustomModal>
    )
}