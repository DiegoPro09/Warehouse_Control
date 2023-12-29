import { Button, Form, Spin, message } from "antd"
import { SignupFormFields } from "../../../../shared/configs/formFields"
import { useState } from "react"
import { AuthRes, signupReq, signupService } from "../../services/signupService"
import { useAction } from "../../../../shared/hooks/useAction"
import { publicRoutes } from "../../../../shared/configs/routes"
import { useNavigate } from "react-router-dom"
import { CustomCard } from "../../../../components/Card/CustomCard"
import { CustomForm } from "../../../../components/Form/CustomForm"
import { PalletteEnum } from "../../../../shared/pallete/PalleteEnum"
import { LoadingOutlined } from "@ant-design/icons"


export const SignUp:React.FC = () => {
    const [form] = Form.useForm()
    const [, setErr] = useState("")
    const [, setSuccess] = useState(false)

    const fields = SignupFormFields()
    const navigate = useNavigate()

    const {action, isLoading} = useAction<signupReq, AuthRes>({
        key: 'login',
        fn: signupService,
        onSuccess:()=>{
            message.success('Usuario registrado exitosamente!')
            setErr('')
            setSuccess(true)
            navigate(publicRoutes.login)
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
        .then((data) => {
            action(data)
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    return(
        <CustomCard
            cardTitle="Registrarse" 
            actions={[
                <Button disabled={isLoading} type='primary' onClick={handleAction}>
                    {isLoading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}/> : 'Registrarse'}
                </Button>
            ]}
            type="signup"
        >
            <CustomForm fields={fields} form={form} />
            Ya tiene una cuenta? <a href={publicRoutes.login} style={{color: PalletteEnum.links}}><u>Inicie Sesion</u></a>
        </CustomCard>
    )
}