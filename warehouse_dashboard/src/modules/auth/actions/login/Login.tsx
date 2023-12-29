import { Button, Form, Spin, message } from "antd";
import { PalletteEnum } from "../../../../shared/pallete/PalleteEnum";
import { CustomCard } from "../../../../components/Card/CustomCard";
import { CustomForm } from "../../../../components/Form/CustomForm";
import { LoginFormFields } from "../../../../shared/configs/formFields";
import { useAuthContext } from "../../AuthContext";
import { useState } from "react";
import { useAction } from "../../../../shared/hooks/useAction";
import { AuthRes, loginReq, loginService } from "../../services/loginService";
import { User } from "../../../../domain/models/User";
import { LoadingOutlined } from "@ant-design/icons";
import { privateRoutes } from "../../../../shared/configs/routes";

export const Login:React.FC = () => {
    const [form] = Form.useForm()
    const [, setErr] = useState("")
    const [, setSuccess] = useState(false)
    
    const { setLoggedIn } = useAuthContext()

    const fields = LoginFormFields()

    const {action, isLoading} = useAction<loginReq, AuthRes>({
        key: 'login',
        fn: loginService,
        onSuccess:(res)=>{
            message.success('Bienvenido!')
            setErr('')
            setSuccess(true) 
            setLoggedIn(true, res.token, privateRoutes.products)
        },
        onError:(error)=>{
            console.log(error)
            message.error(error.message)
            setErr(error.message) 
            setSuccess(false)
        }
    })

    const handleAction = async() => {
        await form.validateFields()
        .then((data:User) => {
            action(data)
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    return(
        <CustomCard
            cardTitle="Ingresar" 
            actions={[
                <Button disabled={isLoading} type='primary' onClick={handleAction}>
                    {isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}/> : 'Ingresar'}
                </Button>
            ]}
            type="login"
        >
            <CustomForm fields={fields} form={form} finish={action} />
            No tiene una cuenta? <a href="/signup" style={{color: PalletteEnum.links}}><u>Registrese</u></a>
        </CustomCard>
    )
}