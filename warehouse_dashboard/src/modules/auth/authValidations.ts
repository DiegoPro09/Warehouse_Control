import { Rule } from "antd/es/form";
import { regExp } from "../../domain/enums/RegExp";

export const validations:{[fieldName:string]:Rule[]} = {
    name_user:[{
        required: true,
        message: 'Nombre requerido'
    },{
        pattern: regExp.text,
        message: 'Nombre no válido'
    }],
    lastname:[{
        required: true,
        message: 'Apellido requerido'
    },{
        pattern: regExp.text,
        message: 'Apellido no válido'
    }],
    email:[{
        required: true,
        message: 'Email requerido'
    },{
        pattern: regExp.email,
        message: 'Email no válido'
    }],
    password:[{
        required: true,
        message: 'Contraseña requerida'
    },{
        pattern: regExp.password,
        message: 'Por favor ingrese una contraseña valida, debe tener una mayuscula, numeros y un caracter especial'
    }],
    name_category:[{
        required: true,
        message: 'Nombre de categoria requerido'
    },{
        pattern: regExp.text,
        message: 'Nombre no válido'
    }],
    name_warehouse:[{
        required: true,
        message: 'Nombre de almacen requerido'
    },{
        pattern: regExp.text,
        message: 'Nombre no válido'
    }],
    name_product:[{
        required: true,
        message: 'Nombre del producto requerido'
    },{
        pattern: regExp.text,
        message: 'Nombre no válido'
    }],
    price:[{
        required: true,
        message: 'Precio requerido'
    }],
    id_category:[{
        required: true,
        message: 'Categoia requerida'
    }]
}