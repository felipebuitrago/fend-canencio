import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { createProveedorStore,
        addProveedoresStore,
        updateProveedorStore,
        deleteProveedorStore } from '../../store/slices';

export const useProveedoresStore = () => {
  
    const dispatch = useDispatch();
    const { proveedores } = useSelector(state => state.proveedores);

    const startCreateProveedor = () => {
        //TODO: create OPERATION

        dispatch(createProveedorStore());
    }
    
    const startReadProveedores = async() => {

        const proveedoresDB = await canencioApi.get('/proveedores');
        dispatch(addProveedoresStore(proveedoresDB.data.result));
    }

    const startUpdateProveedor = (id, data) => {

        //TODO: UPDATE OPERATION


        dispatch(updateProveedorStore({id, data}));
    }
    
    const startDeleteProveedor = (id) => {

        //TODO: DELETE OPERATION


        dispatch(deleteProveedorStore({id}));
    }


    return {
        //propiedades
        proveedores,
    
        //metodos
        startCreateProveedor,
        startReadProveedores,
        startUpdateProveedor,
        startDeleteProveedor
    }
}

