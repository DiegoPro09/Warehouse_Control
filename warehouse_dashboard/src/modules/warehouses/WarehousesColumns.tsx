import { ColumnsType } from "antd/es/table";
import { Flex } from "antd";
import { DeleteWarehouse } from "./actions/DeleteWarehouse";
import { UpdateWarehouse } from "./actions/UpdateWarehouse";
import { Warehouse } from "../../domain/models/Warehouse";

export const warehousesColumns:ColumnsType<Warehouse> = [
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
    {
        title:'Descripcion',
        dataIndex: 'description',
        key: 'description'
    },
    {
        title: 'Acciones',
        render: (_text, record) => (
            <Flex gap={'middle'}>
                <UpdateWarehouse id={record.id} />
                <DeleteWarehouse warehouse={record.id} />
            </Flex>
        ),
    }
]