export const LoginFormFields = () => {

    const fields = [
        { 
            name: 'email', 
            label: 'Email', 
            placeholder: 'Ingrese el email', 
            tooltip: 'example@algo.com',
            type: 'email' 
        },
        { 
            name: 'password', 
            label: 'Contraseña', 
            placeholder: 'Ingrese la contraseña', 
            tooltip: 'Debe tener un caracter especial, numeros y al menos una mayuscula',
            type: 'password' 
        }
    ]

    return fields
}

export const SignupFormFields = () => {

    const fields = [
        { 
            name: 'name_user', 
            label: 'Nombre', 
            placeholder: 'Ingrese su nombre', 
            tooltip: 'Debe ingresar su nombre'
        },
        { 
            name: 'lastname', 
            label: 'Apellido', 
            placeholder: 'Ingrese su apellido', 
            tooltip: 'Debe ingresar su apellido'
        },
        { 
            name: 'email', 
            label: 'Email', 
            placeholder: 'Ingrese el email', 
            tooltip: 'example@algo.com',
            type: 'email' 
        },
        { 
            name: 'password', 
            label: 'Contraseña', 
            placeholder: 'Ingrese la contraseña', 
            tooltip: 'Debe tener un caracter especial, numeros y al menos una mayuscula',
            type: 'password' 
        },
        { 
            name: 'password_confirmation', 
            label: 'Verificar contraseña', 
            placeholder: 'Ingrese nuevamente su contraseña', 
            tooltip: 'Debe tener un caracter especial, numeros y al menos una mayuscula',
            type: 'password' 
        }
    ]

    return fields
}

export const CategoriesFormFields = () => {
    const fields =[
        { 
            name: 'name_category', 
            label: 'Nombre de la categoria', 
            placeholder: 'Ingrese el nombre de la categoria', 
            tooltip: 'Debe ingresar el nombre de la categoria',
        }
    ]

    return fields
}

export const WarehousesFormFields = () => {
    const fields =[
        { 
            name: 'name_warehouse', 
            label: 'Nombre del almacen', 
            placeholder: 'Ingrese el nombre del almacen', 
            tooltip: 'Debe ingresar el nombre del almacen',
        },
        { 
            name: 'description', 
            label: 'Descripcion del almacen', 
            placeholder: 'Ingrese la descripcion del almacen', 
            tooltip: 'Debe ingresar descripcion del almacen',
        }
    ]

    return fields
}

export const ProductsFormFields = () => {
    const fields =[
        { 
            name: 'name_product', 
            label: 'Nombre del producto', 
            placeholder: 'Ingrese el nombre del producto', 
            tooltip: 'Debe ingresar el nombre del producto',
        },
        { 
            name: 'price', 
            label: 'Precio del producto', 
            placeholder: 'Ingrese el precio del producto', 
            tooltip: 'Debe ingresar el precio del producto',
        },
        { 
            name: 'observations', 
            label: 'Observaciones', 
            placeholder: 'Ingrese las observaciones', 
            tooltip: 'Debe ingresar observaciones del producto',
        },
        { 
            name: 'id_category', 
            label: 'Seleccione la categoria del producto', 
            placeholder: 'Seleccione una categoria', 
            tooltip: 'Debe seleccionar la categoria',
            type: 'select',
            mode: "default"
        },
        { 
            name: 'warehouses', 
            label: 'Seleccione los almacenes donde se encuentra el producto', 
            placeholder: 'Seleccione el/los almacenes', 
            tooltip: 'Debe seleccionar el/los almacenes',
            type: 'select',
            mode: "tags"
        }
    ]

    return fields
}