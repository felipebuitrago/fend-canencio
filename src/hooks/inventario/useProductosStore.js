import { useDispatch, useSelector } from 'react-redux';

import { createProductoStore,
        readProductosStore,
        updateProductoStore,
        deleteProductoStore } from '../../store/slices';

export const useProductosStore = () => {
  
    const dispatch = useDispatch();
    const { productos } = useSelector(state => state.productos);


    const startCreateProducto = () => {
        dispatch(createProductoStore());
    }
    
    const startReadProductos = () => {
        dispatch(readProductosStore());
    }

    const startUpdateProducto = () => {
        dispatch(updateProductoStore());
    }
    
    const startDeleteProducto = () => {
        dispatch(deleteProductoStore());
    }


    return {
        //propiedades
        productos,
    
        //metodos
        startCreateProducto,
        startReadProductos,
        startUpdateProducto,
        startDeleteProducto
    }
}

