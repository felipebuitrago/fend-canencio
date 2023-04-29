import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { createAlmacenStore,
        addAlmacenesStore,
        updateAlmacenStore,
        deleteAlmacenStore } from '../../store/slices';

export const useAlmacenesStore = () => {
  
    const dispatch = useDispatch();
    const { almacenes } = useSelector(state => state.almacenes);

    const startCreateAlmacen = () => {
        //TODO: create OPERATION

        dispatch(createAlmacenStore());
    }
    
    const startReadAlmacenes = async() => {

        const almacenesDB = await canencioApi.get('/almacenes');
        dispatch(addAlmacenesStore(almacenesDB.data.result));
    }

    const startUpdateAlmacen = (id, data) => {

        //TODO: UPDATE OPERATION


        dispatch(updateAlmacenStore({id, data}));
    }
    
    const startDeleteAlmacen = (id) => {

        //TODO: DELETE OPERATION


        dispatch(deleteAlmacenStore({id}));
    }


    return {
        //propiedades
        almacenes,
    
        //metodos
        startCreateAlmacen,
        startReadAlmacenes,
        startUpdateAlmacen,
        startDeleteAlmacen
    }
}

