import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { addMovimientosStore } from '../../store/slices';

export const useMovimientosStore = () => {
  
    const dispatch = useDispatch();
    const { movimientos } = useSelector(state => state.movimientos);
    
    const startReadMovimientos = async() => {

        const movimientos = await canencioApi.get('/inventario');
        dispatch(addMovimientosStore(movimientos.data.result));
    }

    return {
        //propiedades
        movimientos,
    
        //metodos
        startReadMovimientos
    }
}