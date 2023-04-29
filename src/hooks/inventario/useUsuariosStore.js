import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { createUsuarioStore,
        addUsuariosStore,
        updateUsuarioStore,
        deleteUsuarioStore } from '../../store/slices';

export const useUsuariosStore = () => {
  
    const dispatch = useDispatch();
    const { usuarios } = useSelector(state => state.usuarios);

    const startCreateUsuario = () => {
        //TODO: create OPERATION

        dispatch(createUsuarioStore());
    }
    
    const startReadUsuarios = async() => {

        const usuariosDB = await canencioApi.get('/usuarios');
        dispatch(addUsuariosStore(usuariosDB.data.result));
    }

    const startUpdateUsuario = (id, data) => {

        //TODO: UPDATE OPERATION


        dispatch(updateUsuarioStore({id, data}));
    }
    
    const startDeleteUsuario = (id) => {

        //TODO: DELETE OPERATION


        dispatch(deleteUsuarioStore({id}));
    }


    return {
        //propiedades
        usuarios,
    
        //metodos
        startCreateUsuario,
        startReadUsuarios,
        startUpdateUsuario,
        startDeleteUsuario
    }
}