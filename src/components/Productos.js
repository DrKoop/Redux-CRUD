import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { obtenerProductosAction } from '../actions/productoActions'
import Producto from './Producto'

const Productos = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    //COnsultar API
    const cargarProductos = () => dispatch( obtenerProductosAction() );
    cargarProductos();
  }, [])

  //Obtener state => Acceder a las propiedades de los actions
  const productos = useSelector( state => state.productos.productos );
  const error = useSelector( state => state.productos.error );
  const cargando = useSelector( state => state.productos.loading );
 

  return (
    <>
        <h2 className='text-center my-5' >Listado de Productos</h2>

        { error ? <p className='font-weight-bold alert alert-danger text-center mt-4'>Ha Ocurrido un Error</p> : null }

        { cargando ? <p className='text-center'>Cargando...</p> : null }
        <table className='table table-striper'>
            <thead className='bg-primary table-dark'>
                <tr>
                    <th scope='col'>Nombre</th>
                    <th scope='col'>Precio</th>
                    <th scope='col'>Acciones</th>
                </tr>
            </thead>
            <tbody>
                { productos.length === 0 ? 'Aun no se han agregado productos' : (
                    productos.map( producto => (
                      <Producto
                        key={producto.id}
                        producto={producto}
                      />
                    ))
                )}
            </tbody>
        </table>

    </>
  )
}

export default Productos