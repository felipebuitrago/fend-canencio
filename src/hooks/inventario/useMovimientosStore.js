import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { addMovimientosStore } from '../../store/slices';

import { useProductosStore } from "./useProductosStore";

export const useMovimientosStore = () => {
  
    const dispatch = useDispatch();
    const { movimientos } = useSelector(state => state.movimientos);

    const { startReadProductos } = useProductosStore();
    
    const startReadMovimientos = async() => {

        const movimientos = await canencioApi.get('/inventario');
        dispatch(addMovimientosStore(movimientos.data.result));
        localStorage.setItem('token', movimientos.data.newToken);
    }

    const startCreateMovimiento = async(tipoMovimiento, producto, presentacion, almacen, tercero, fecha, cantidad, factura, nota, idProducto, nuevoStock) => {

        const result = await canencioApi.post('/inventario/new',{tipoMovimiento, producto, presentacion, almacen, tercero, fecha, cantidad, factura, nota, idProducto, nuevoStock});
        localStorage.setItem('token', result.data.newToken);
        startReadProductos();
    }

    return {
        //propiedades
        movimientos,
    
        //metodos
        startReadMovimientos,
        startCreateMovimiento
    }
}