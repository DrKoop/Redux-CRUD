
import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINADO_EXITO,
    PRODUCTO_ELIMINADO_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types';

import clienteAxios from '../config/axios';
import axios from 'axios';
import Swal from 'sweetalert2';

//Crear nuevos productos
export function crearNuevoProductoAction(producto){
    return async ( dispatch ) => {
        dispatch( agregarProducto() );

        try {
            //Insertar en data en la API
           await axios.post("http://localhost:4000/productos", producto)

            dispatch( agregarProductoExito(producto) );

            Swal.fire(
                'Correcto',
                'Producto Agregado Correctamente',
                'success'
            );
        } catch (error) {

            console.log(error);
            dispatch( agregarProdcutoError(true) );

            Swal.fire({
                icon : 'error',
                title : 'Hubo un error',
                text : 'Hubo un error, intenta de nuevo'
            });
        }
    }
}

const agregarProducto = () => ({
    type : AGREGAR_PRODUCTO,
    payload : true
})

//Guardar producto en la BD
const agregarProductoExito = producto => ({
    type : AGREGAR_PRODUCTO_EXITO,
    payload : producto
}) 


//Manejo de errores

const agregarProdcutoError = estado => ({
    type : AGREGAR_PRODUCTO_ERROR,
    payload : estado

})

/* -------------------------------------------------------------------------- */
/*                       LISTAR PRODUCTOS DE LA API - BD                      */
/* -------------------------------------------------------------------------- */

export function obtenerProductosAction(){
    
    return async dispatch => {
        dispatch( descagarProductos() );

        try {

            setTimeout( async () => {
                const respuesta = await axios.get("http://localhost:4000/productos")

                dispatch( descagaProductosExitosa(respuesta.data) )
            }, 1500);


        } catch (error) {
            console.log(error)
            dispatch( descagarProductosError() )
        }
    }
}


const descagarProductos = () => ({
    type : COMENZAR_DESCARGA_PRODUCTOS,
    payload : true
})

const descagaProductosExitosa = prodcutos => ({
    type : DESCARGA_PRODUCTOS_EXITO,
    payload : prodcutos
})

const descagarProductosError = () => ({
    type : DESCARGA_PRODUCTOS_ERROR,
    payload : true
})

//Selecciona y elimina producto

export function borrarProductoAction(id) {
    return async ( dispatch ) => {

        dispatch( obtenerProductoEliminar(id) );
        
        try {
            await axios.delete(`http://localhost:4000/productos/${id}`);
            dispatch( eliminarProductoExito() );
            //Si , se elimina,mostramos alerta
            Swal.fire(
                'Eliminado!',
                'El producto se ha eliminado correctamente.',
                'success'
              )
        } catch (error) {
            console.log(error);
            dispatch( eliminarProductoError() )
        }
    }
}

const obtenerProductoEliminar  = id => ({
    type : OBTENER_PRODUCTO_ELIMINAR,
    payload : id
})

const eliminarProductoExito = () => ({
    type : PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
    type : PRODUCTO_ELIMINADO_ERROR,
    payload : true
})

//Colocar producto en edicion
export function obtenerProductoEditar(producto){
    return( dispatch ) => {
        dispatch( obtenerProductoEditarAction(producto) )
    }
}

const obtenerProductoEditarAction = (producto) => ({
    type : OBTENER_PRODUCTO_EDITAR,
    payload : producto
})


//Editar registro en la API y STATE
export function editarProductoAction(producto){

    return async ( dispatch ) => {
        dispatch( editarProducto() );
        try {
            await axios.put(`http://localhost:4000/productos/${producto.id}`, producto);
            dispatch( editarProductoExito(producto));
        } catch (error) {
            console.log(error)
            dispatch( editarProductoError() )
        }
    }
}

const editarProducto = () => ({
    type : COMENZAR_EDICION_PRODUCTO
})

const editarProductoExito = ( producto ) => ({
    tyoe : PRODUCTO_EDITADO_EXITO,
    payload : producto
})

const editarProductoError = () => ({
    type : PRODUCTO_EDITADO_ERROR,
    payload: true
})