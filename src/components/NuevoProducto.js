import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//Actions
import { crearNuevoProductoAction } from '../actions/productoActions'


const NuevoProducto = () => {
    //state LOCAL
    const [ nombre, setNombre ] = useState('');
    const [ precio, setPrecio ] = useState(0);

    //Utilizar dispatch parar crear una funcion
    const dispatch =  useDispatch();

    const agregarProducto = producto => dispatch(crearNuevoProductoAction(producto));

    const submitNuevoProducto = e => {
        e.preventDefault();

        //Validacion formulario
        if( nombre.trim() === '' || precio <= 0 ){
            return;
        }

        //Verificar si existe algun error

        //Agregar un Nuevo Producto
        agregarProducto({
            nombre,
            precio
        });
    }

  return (
    <div className='row justify-content-center'>
        <div className='col-md-8'>
            <div className='card'>
                <div className='card-body'>
                    <h2 className='text-center mb-4 font-weight-bold'>
                        Agregar Nuevo Producto
                    </h2>
                    <form
                        onSubmit={ submitNuevoProducto }
                    >
                        <div className='form-group'>
                            <label>Nombre Producto</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Nombre Producto'
                                name='nombre'
                                value={ nombre }
                                onChange={ e => setNombre( e.target.value )}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Precio Producto</label>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Precio Producto'
                                name='precio'
                                value={ precio }
                                onChange={ e => setPrecio( +e.target.value )}
                            />
                        </div>
                        <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                            Agregar Producto
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NuevoProducto