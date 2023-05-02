import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { createProveedorStore,
        addProveedoresStore,
        buscarProveedorStore,
        updateProveedorStore,
        deleteProveedorStore } from '../../store/slices';

export const useProveedoresStore = () => {
  
    const dispatch = useDispatch();
    const { proveedores, proveedorSeleccionado } = useSelector(state => state.proveedores);

    const startCreateProveedor = async(nombre, contacto) => {
        
        const result = await canencioApi.post('/proveedores/new',{nombre, contacto});

        dispatch(createProveedorStore(result.data.newDocument));
    }
    
    const startReadProveedores = async() => {

        const proveedoresDB = await canencioApi.get('/proveedores');
        dispatch(addProveedoresStore(proveedoresDB.data.result));
    }

    const startBuscarProveedor = (id) => {
        
        dispatch(buscarProveedorStore({id}));
    }

    const startUpdateProveedor = async(id, data) => {

        const {nombre,contacto} = data;
        await canencioApi.put(`/proveedores/update/${id}`,{nombre,contacto});

        dispatch(updateProveedorStore({id, data}));
    }
    
    const startDeleteProveedor = async(id) => {

        await canencioApi.delete(`/proveedores/delete/${id}`);

        dispatch(deleteProveedorStore({id}));
    }


    return {
        //propiedades
        proveedores,
        proveedorSeleccionado,
    
        //metodos
        startCreateProveedor,
        startReadProveedores,
        startBuscarProveedor,
        startUpdateProveedor,
        startDeleteProveedor
    }
}

