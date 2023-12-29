import { Alert, Button, Divider, Modal, Tooltip } from "antd"
import { TooltipPlacement } from "antd/es/tooltip"
import { useCallback, useEffect, useState } from "react"

interface CustomModalProps{
    disabled?:boolean
    action: () => void,
    closeOn?:boolean
    isLoading?: boolean, 
    children: React.ReactNode, 
    title: string, 
    tooltiptitle: string, 
    actionTitle:string,
    actionButtons: React.ReactNode,
    icon: React.ReactNode, 
    error?:string,
    onClose?:()=>void,
    shape?:string,
    buttonTitle?:string,
    placement:TooltipPlacement
} 

export const CustomModal:React.FC<CustomModalProps> = ({ disabled, action, closeOn, isLoading, children, title, tooltiptitle, actionTitle, icon, error, onClose, shape, actionButtons, buttonTitle, placement }) =>{
    const [modal,setModal] = useState(false)

    const closeModal = useCallback(() =>{
        setModal(false)
        onClose && onClose()
    }, [onClose])

    const openModal= () => {
        setModal(true)
    }

    const handleOk = () => {
        action()
    };

    useEffect(()=>{
        closeOn && closeModal()
    },[closeOn, closeModal])

    return (
        <>
            <Tooltip title={tooltiptitle} placement={placement}>
                <Button disabled={disabled} shape={shape === 'default' ? 'default' : 'circle'} icon={icon} onClick={openModal}>
                    {shape === 'default' && buttonTitle}
                </Button>
            </Tooltip>

            <Modal
                title = {title}
                open={modal} 
                onCancel={closeModal} 
                okText={actionTitle} 
                destroyOnClose 
                centered 
                onOk={handleOk} 
                confirmLoading={isLoading}
                width={700}
                footer={actionButtons}
            >   
                <Divider />
                {children}
                {error && <Alert message={error} type="error" showIcon /> }
            </Modal>
        </>
    )
}