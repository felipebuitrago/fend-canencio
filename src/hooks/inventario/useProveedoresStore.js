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
        localStorage.setItem('token', result.data.newToken);
    }
    
    const startReadProveedores = async() => {

        const result = await canencioApi.get('/proveedores');
        dispatch(addProveedoresStore(result.data.result));
        localStorage.setItem('token', result.data.newToken);
    }

    const startBuscarProveedor = (id) => {
        
        dispatch(buscarProveedorStore({id}));
    }

    const startUpdateProveedor = async(id, data) => {

        const {nombre,contacto} = data;
        const result = await canencioApi.put(`/proveedores/update/${id}`,{nombre,contacto});

        dispatch(updateProveedorStore({id, data}));
        localStorage.setItem('token', result.data.newToken);
    }
    
    const startDeleteProveedor = async(id) => {

        const result = await canencioApi.delete(`/proveedores/delete/${id}`);

        dispatch(deleteProveedorStore({id}));
        localStorage.setItem('token', result.data.newToken);
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

