import { Select, SelectProps } from "antd"

interface _SelectProps {
    options: SelectProps['options']
}

export const CustomSelect:React.FC<_SelectProps> = ({ options }) =>{
    const _options = options;

    const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
    };
    
    return(
        <Select
            mode="multiple"
            placeholder="Please select"
            onChange={handleChange}
            style={{ width: '100%' }}
            options={_options}
        />
    )
}