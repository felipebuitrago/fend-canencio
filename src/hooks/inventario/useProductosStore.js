import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { createProductoStore,
        addProductosStore,
        updateProductoStore,
        deleteProductoStore } from '../../store/slices';

export const useProductosStore = () => {
  
    const dispatch = useDispatch();
    const { productos } = useSelector(state => state.productos);

    const startCreateProducto = () => {
        //TODO: create OPERATION

        dispatch(createProductoStore());
    }
    
    const startReadProductos = async() => {

        const productosDB = await canencioApi.get('/products');

        dispatch(addProductosStore(productosDB.data.result));
    }

    const startUpdateProducto = (id, data) => {

        //TODO: UPDATE OPERATION


        dispatch(updateProductoStore({id, data}));
    }
    
    const startDeleteProducto = (id) => {

        //TODO: DELETE OPERATION


        dispatch(deleteProductoStore({id}));
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

