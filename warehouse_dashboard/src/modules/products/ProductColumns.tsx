import { ColumnsType } from "antd/es/table";
import { Product } from "../../domain/models/Product";
import { Flex } from "antd";
import { DeleteProduct } from "./actions/DeleteProduct";
import { UpdateProduct } from "./actions/UpdateProduct";
import { ProductWarehouse } from "./actions/ProductWarehouse";

export const productsColumns:ColumnsType<Product> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Nombre',
        dataIndex: 'name_product',
        key: 'name_product',
    },
    {
        title: 'Precio',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title:'Observaciones',
        dataIndex: 'observations',
        key: 'observations'
    },
    {
        title:'Categoria',
        dataIndex: 'category',
        key: 'category'
    },
    {
        title: 'Acciones',
        render: (_text, record) => (
            <Flex gap={'middle'}>
                <UpdateProduct id={record.id} />
                <ProductWarehouse id={record.id} />
                <DeleteProduct product={record.id} />
            </Flex>
        ),
    }
]

export const productsWarehouseColumns:ColumnsType<Product> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Nombre',
        dataIndex: 'name_warehouse',
        key: 'name_warehouse',
    },
]