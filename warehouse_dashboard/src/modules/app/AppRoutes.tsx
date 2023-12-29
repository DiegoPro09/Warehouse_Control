import { privateRoutes, publicRoutes } from "../../shared/configs/routes"
import { Login } from "../auth/actions/login/Login"
import { SignUp } from "../auth/actions/signup/Signup"
import { CategoryPage } from "../categories/CategoryPage"
import { ProductPage } from "../products/ProductPage"
import { WarehousePage } from "../warehouses/WarehousePage"

export interface AppRoutes {
    path:string,
    name:string,
    component:React.ReactNode,
    icon?:React.ReactNode
}

export const PUBLIC_ROUTES:AppRoutes[] = [
    {
        path:publicRoutes.login,
        name:'Login',
        component: <Login/>
    },
    {
        path: publicRoutes.login,
        name:'Login',
        component: <Login/>
    },
    {
        path: publicRoutes.signup,
        name:'Signup',
        component:<SignUp />
    },
]

export const PRIVATE_ROUTES:AppRoutes[] = [
    {
        path: privateRoutes.products,
        name:'Products',
        component: <ProductPage />
    },
    {
        path: privateRoutes.categories,
        name:'Categories',
        component: <CategoryPage />
    },
    {
        path: privateRoutes.warehouse,
        name:'Warehouse',
        component: <WarehousePage />
    },
]