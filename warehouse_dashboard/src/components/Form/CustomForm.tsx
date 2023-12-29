import { Col, Form, FormInstance, Input, Row, Select, SelectProps} from "antd"
import { validations } from "../../modules/auth/authValidations"
import { loginReq } from "../../modules/auth/services/loginService"

interface CustomFormProps {
    form: FormInstance
    fields: Array<{ name: string, label?: string, placeholder: string, tooltip: string, type?:string, mode?: string | undefined }>,
    finish?: (payload:loginReq) => Promise<void>
    values?:[],
    handleCChange?: (value:[])=>void,
    selectCOptions?:SelectProps['options'],
    handleWChange?: (value:[])=>void,
    selectWOptions?:SelectProps['options'],
    update?:boolean
}

export const CustomForm: React.FC<CustomFormProps> = ({ form, fields, finish, values, handleCChange, selectCOptions, handleWChange, selectWOptions, update }: CustomFormProps) => {
    return (
      <Form form={form} onFinish={finish} layout="vertical" autoComplete="on" initialValues={values}>
        <Row gutter={[10, 10]}>
          {fields.map((field, index) => (
            <Col key={index} span={(fields.length > 2 ? field.name === 'email' ? 24 : 12 : 24)}>
              {field.type === 'select' ? (
                field.name === 'id_category' ?
                  (<Form.Item name={field.name} label={field.label} tooltip={field.tooltip} rules={validations[field.name]}>
                    <Select
                      mode={field.mode}
                      placeholder={field.placeholder}
                      onChange={handleCChange}
                      style={{ width: '100%' }}
                      options={selectCOptions}
                    />
                </Form.Item>) : 
                (<Form.Item hidden={update === true ? true : false} name={field.name} label={field.label} tooltip={field.tooltip} rules={validations[field.name]}>
                    <Select
                      mode={field.mode}
                      placeholder={field.placeholder}
                      onChange={handleWChange}
                      style={{ width: '100%' }}
                      options={selectWOptions}
                    />
                </Form.Item>)
              ) : (
                <Form.Item name={field.name} label={field.label} tooltip={field.tooltip} rules={validations[field.name]}>
                  <Input placeholder={field.placeholder} type={field.type} />
                </Form.Item>
              )}
            </Col>
          ))}
        </Row>
      </Form>
    )
  }