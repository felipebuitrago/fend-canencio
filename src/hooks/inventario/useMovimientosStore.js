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
    }

    const startCreateMovimiento = async(tipoMovimiento, producto, presentacion, almacen, tercero, fecha, cantidad, nota, idProducto, nuevoStock) => {

        await canencioApi.post('/inventario/new',{tipoMovimiento, producto, presentacion, almacen, tercero, fecha, cantidad, nota, idProducto, nuevoStock});
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