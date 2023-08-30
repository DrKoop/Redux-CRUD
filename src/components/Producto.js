import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions'
import Swal from 'sweetalert2'

const Producto = ({producto}) => {

  const { nombre, precio, id} = producto;
  const dispatch = useDispatch();
  const history = useNavigate();

  //confirmar si el usuario desea eliminar

  const confirmarEliminarProducto = id => {
    //preguntar al usuario
    Swal.fire({
      title: '¿Esta seguro que desea eliminar el producto?',
      text: "un prodcuto que se elimina no se puede recuperar!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText : 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        //pasarlo al action
        dispatch( borrarProductoAction(id) );
      }
    })


  }

  //Redireccionamiento de Edicion
  const redireccionEdicion = producto => {
    //console.log(producto)
    dispatch( obtenerProductoEditar(producto) );
    history(`/productos/editar/${producto.id}`);
  }

  return (
   <>
    <tr>
      <td>{nombre}</td>
      <td><span className='font-weight-bold'>$ {precio}</span></td>
      <td className='acciones'>
        <button type='button' onClick={ () => redireccionEdicion(producto) } className='btn btn-primary mr-2'>Editar</button>
        <button className='btn btn-danger' onClick={ () => confirmarEliminarProducto(id) }  type="button">Eliminar</button>
      </td>
    </tr>
   </>
  )
}

export default Producto