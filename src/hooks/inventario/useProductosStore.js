import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import {addProductosStore,
        buscarProductoStore,
        deleteProductoStore } from '../../store/slices';

export const useProductosStore = () => {
  
    const dispatch = useDispatch();
    const { productos, productoSeleccionado } = useSelector(state => state.productos);

    const startCreateProducto = async(nombre, presentacion, categoria, proveedor, almacen) => {
        
        await canencioApi.post('/products/new',{nombre, presentacion, categoria, proveedor, almacen});
    }
    
    const startReadProductos = async() => {

        const productosDB = await canencioApi.get('/products');
        dispatch(addProductosStore(productosDB.data.result));
    }

    const startBuscarProducto = (id) => {
        
        dispatch(buscarProductoStore({id}));
    }

    const startUpdateProducto = async(id, data) => {

        const {nombre, presentacion, categoria} = data;
        if(categoria){
            await canencioApi.put(`/products/update/${id}`,{nombre, presentacion, categoria});
        }
        else{
            await canencioApi.put(`/products/update/${id}`,{nombre, presentacion});        
        }
        startReadProductos();
    }
    
    const startDeleteProducto = async(id) => {

        await canencioApi.delete(`/products/delete/${id}`);
        dispatch(deleteProductoStore({id}));
    }

    const startTrasladarProducto = async(idProductoOrigen, nombreProductoOrigen, cantidad, stockActualOrigen, presentacion, almacenDestino, proveedorID, categoriasIDs) => {

        //console.log(idProductoOrigen, nombreProductoOrigen, cantidad, almacenDestino);
        const result = await canencioApi.post(`/products/trasladar`,{idProductoOrigen, nombreProductoOrigen, cantidad, stockActualOrigen, presentacion, almacenDestino, proveedorID, categoriasIDs});
        
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

