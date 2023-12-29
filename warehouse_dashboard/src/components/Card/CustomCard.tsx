import { Flex, Card } from "antd"

interface CardProps {
    cardTitle:string,
    actions: Array<React.ReactNode>,
    children: React.ReactNode,
    type: string
}

export const CustomCard:React.FC<CardProps> = ({ cardTitle, actions, children, type}) =>{
    return (
        <Flex 
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        >
            <Card 
                title={cardTitle} 
                actions={actions} 
                bordered={false} 
                style={{borderRadius: 0, width: type === 'login' ? 280 : 480}} 
                headStyle={{textAlign: 'center'}}
            >
                {children}
            </Card>
        </Flex>
    )
}