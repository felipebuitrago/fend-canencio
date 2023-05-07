import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import {addProductosStore,
        buscarProductoStore,
        deleteProductoStore } from '../../store/slices';

export const useProductosStore = () => {
  
    const dispatch = useDispatch();
    const { productos, productoSeleccionado } = useSelector(state => state.productos);

    const startCreateProducto = async(nombre, presentacion, categoria, proveedor, almacen) => {
        
        const result = await canencioApi.post('/products/new',{nombre, presentacion, categoria, proveedor, almacen});
        localStorage.setItem('token', result.data.newToken);
    }
    
    const startReadProductos = async() => {

        const result = await canencioApi.get('/products');
        dispatch(addProductosStore(result.data.result));
        localStorage.setItem('token', result.data.newToken);
    }

    const startBuscarProducto = (id) => {
        
        dispatch(buscarProductoStore({id}));
    }

    const startUpdateProducto = async(id, data) => {

        const {nombre, presentacion, categoria} = data;
        if(categoria){
            const result = await canencioApi.put(`/products/update/${id}`,{nombre, presentacion, categoria});
            localStorage.setItem('token', result.data.newToken);
        }
        else{
            const result = await canencioApi.put(`/products/update/${id}`,{nombre, presentacion});        
            localStorage.setItem('token', result.data.newToken);
        }
        startReadProductos();
    }
    
    const startDeleteProducto = async(id) => {

        const result = await canencioApi.delete(`/products/delete/${id}`);
        dispatch(deleteProductoStore({id}));
        localStorage.setItem('token', result.data.newToken);
    }

    const startTrasladarProducto = async(idProductoOrigen, nombreProductoOrigen, cantidad, stockActualOrigen, presentacion, almacenDestino, proveedorID, categoriasIDs, almacenOrigenLiteral, tercero, almacenDestinoLiteral) => {

        const result = await canencioApi.post(`/products/trasladar`,
            {idProductoOrigen, 
            nombreProductoOrigen, 
            cantidad, 
            stockActualOrigen, 
            presentacion, 
            almacenDestino, 
            proveedorID, 
            categoriasIDs, 
            almacenOrigenLiteral, 
            tercero, 
            almacenDestinoLiteral
        });
        localStorage.setItem('token', result.data.newToken);
        startReadProductos(); 
    }


    return {
        //propiedades
        productos,
        productoSeleccionado,
    
        //metodos
        startCreateProducto,
        startReadProductos,
        startBuscarProducto,
        startUpdateProducto,
        startDeleteProducto,
        startTrasladarProducto
    }
}

