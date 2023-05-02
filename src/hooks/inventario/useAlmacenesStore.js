import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { createAlmacenStore,
        addAlmacenesStore,
        buscarAlmacenStore,
        updateAlmacenStore,
        deleteAlmacenStore } from '../../store/slices';

export const useAlmacenesStore = () => {
  
    const dispatch = useDispatch();
    const { almacenes, almacenSeleccionado } = useSelector(state => state.almacenes);

    const startCreateAlmacen = async(name, location) => {

        const result = await canencioApi.post('/almacenes/new',{name,location});

        dispatch(createAlmacenStore(result.data.result));
    }

    const startBuscarAlmacen = (id) => {
        
        dispatch(buscarAlmacenStore({id}));
    }

    const startReadAlmacenes = async() => {

        const almacenesDB = await canencioApi.get('/almacenes');

        dispatch(addAlmacenesStore(almacenesDB.data.result));
    }

    const startUpdateAlmacen = async(id, data) => {

        const {name,location} = data;
        await canencioApi.put(`/almacenes/update/${id}`,{name,location});

        dispatch(updateAlmacenStore({id, data}));
    }
    
    const startDeleteAlmacen = async(id) => {

        await canencioApi.delete(`/almacenes/delete/${id}`);

        dispatch(deleteAlmacenStore({id}));
    }

    return {
        //propiedades
        almacenes,
        almacenSeleccionado,
    
        //metodos
        startCreateAlmacen,
        startReadAlmacenes,
        startBuscarAlmacen,
        startUpdateAlmacen,
        startDeleteAlmacen
    }
}

