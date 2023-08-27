import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
//Actions
import { crearNuevoProductoAction } from '../actions/productoActions'


const NuevoProducto = ({  }) => {

    let navigate = useNavigate();

    //state LOCAL
    const [ nombre, setNombre ] = useState('');
    const [ precio, setPrecio ] = useState(0);

    //Utilizar dispatch parar crear una funcion
    const dispatch =  useDispatch();

    //Acceder al state del store -> mostrando errores
    const cargando = useSelector( state => state.productos.loading );
    
    const error = useSelector( state => state.productos.error );

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

        //Redireccionar al usuario en caso de que se agregue un producto correctamente
        navigate('/');
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
                    { cargando  ?  <p>Cargando ...</p> : null }
                    { error ? <p className='alert alert-danger p-2 mt-4 text-center'>Ocurrio un Error</p> : null }
                </div>
            </div>
        </div>
    </div>
  )
}

export default NuevoProducto