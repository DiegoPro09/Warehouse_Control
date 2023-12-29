import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface TableProps<T>{
    columns: ColumnsType<T>,
    data: T[],
}

export const CustomTable:React.FC<TableProps> = ({ columns, data }) => {
    return (
        <Table
            columns={columns}
            dataSource={data}
            size='large'
            scroll={{'y': 605}}
            
        />
    );
};