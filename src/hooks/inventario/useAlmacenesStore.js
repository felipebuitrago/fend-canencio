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
        localStorage.setItem('token', result.data.newToken);
    }

    const startBuscarAlmacen = (id) => {
        
        dispatch(buscarAlmacenStore({id}));
    }

    const startReadAlmacenes = async() => {

        const result = await canencioApi.get('/almacenes');

        dispatch(addAlmacenesStore(result.data.result));
        localStorage.setItem('token', result.data.newToken);
    }

    const startUpdateAlmacen = async(id, data) => {

        const {name,location} = data;
        const result = await canencioApi.put(`/almacenes/update/${id}`,{name,location});

        dispatch(updateAlmacenStore({id, data}));
        localStorage.setItem('token', result.data.newToken);
    }
    
    const startDeleteAlmacen = async(id) => {

        const result = await canencioApi.delete(`/almacenes/delete/${id}`);

        dispatch(deleteAlmacenStore({id}));
        localStorage.setItem('token', result.data.newToken);
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

