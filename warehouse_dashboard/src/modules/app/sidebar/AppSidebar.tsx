import { BarsOutlined, HomeOutlined, SnippetsOutlined } from "@ant-design/icons"
import {  Divider, Menu, Typography } from "antd"
import Sider from "antd/es/layout/Sider"
import { useLocation, useNavigate } from "react-router-dom";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Logout } from "../../auth/actions/logout/Logout";
import { privateRoutes } from "../../../shared/configs/routes";

const { Title } = Typography

const menuItems = [
    {
        key:'0',
        icon:<SnippetsOutlined />,
        label: 'Productos',
        path: privateRoutes.products

    },
    
    {
        key:'1',
        icon:<BarsOutlined />,
        label: 'Categorias',
        path: privateRoutes.categories
    },

    {
        key:'2',
        icon:<HomeOutlined />,
        label: 'Almacenes',
        path: privateRoutes.warehouse
    },
] 

export const AppSidebar:React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const menu = menuItems.map((item)=>{
        return {
            ...item,
            onClick:()=>navigate(item.path)
        }
    }) as ItemType[]

    const opened = ((location && menuItems.findIndex((item)=>item.path === location.pathname)) || 0).toString()

    return (
            <Sider
                trigger={null}
                collapsible 
                collapsed={false}
                theme="dark"
            >
                <div className="demo-logo-vertical">
                    <Title level={5} style={{color: 'white', margin: 20}}>
                        Control de almacenes
                    </Title>
                </div>

                <Divider />
                
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[opened]}
                    items={menu}
                />

                <Divider />

                <Logout/>
            </Sider>
    )
}