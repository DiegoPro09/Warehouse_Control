import { Warehouse } from "./Warehouse";

export interface Product {
    id:number,
    name_product:string,
    price: number,
    observations:string,
    warehouses?: [
        id: Warehouse['id'],
        quantity:number
    ],
    id_category?:number
}