import { ColumnsType } from "antd/es/table";
import { Category } from "../../domain/models/Category";
import { Flex } from "antd";
import { UpdateCategory } from "./actions/UpdateCategory";
import { DeleteCategory } from "./actions/DeleteCategory";

export const categoriesColumns:ColumnsType<Category> = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Nombre',
        dataIndex: 'name_category',
        key: 'name_category',
    },
    {
        title: 'Acciones',
        render: (_text, record) => (
            <Flex gap={'middle'}>
                <UpdateCategory id={record.id} />
                <DeleteCategory category={record.id} />
            </Flex>
        ),
    }
]