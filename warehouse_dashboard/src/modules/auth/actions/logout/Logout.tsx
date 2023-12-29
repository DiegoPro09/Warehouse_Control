import { LockFilled } from "@ant-design/icons"
import { Button, message } from "antd"
import { PalletteEnum } from "../../../../shared/pallete/PalleteEnum"
import { useAuthContext } from "../../AuthContext";
import { useAction } from "../../../../shared/hooks/useAction";
import { logoutService } from "../../services/logoutService";
import { useState } from "react";

export const Logout:React.FC = () =>{
    const { logout } = useAuthContext();
    const [, setErr] = useState("")
    const [, setSuccess] = useState(false)

    const {action} = useAction({
        key: 'login',
        fn: logoutService,
        onSuccess:()=>{
            setErr('')
            setSuccess(true) 
            logout();
        },
        onError:(error)=>{
            console.log(error)
            message.error(error.message)
            setErr(error.message) 
            setSuccess(false)
        }
    })
    
    return (
        <Button
            type='primary'
            icon={<LockFilled/>}
            style={{
                position: 'absolute',
                bottom: '0px',
                width: '100%',
                height: '60px',
                backgroundColor: PalletteEnum.secondary,
                borderRadius: 0
            }}
            onClick={action}
        >
            Cerrar sesion
        </Button>
    )
}