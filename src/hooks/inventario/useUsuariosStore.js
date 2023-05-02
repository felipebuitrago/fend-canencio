import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { createUsuarioStore,
        addUsuariosStore,
        buscarUsuarioStore,
        updateUsuarioStore,
        deleteUsuarioStore } from '../../store/slices';

export const useUsuariosStore = () => {
  
    const dispatch = useDispatch();
    const { usuarios, usuarioSeleccionado } = useSelector(state => state.usuarios);

    const startCreateUsuario = async(name, email, password, rol) => {
        
        const result = await canencioApi.post('/usuarios/new',{name, email, password, rol});

        dispatch(createUsuarioStore(result.data.result));
    }
    
    const startReadUsuarios = async() => {

        const usuariosDB = await canencioApi.get('/usuarios');
        dispatch(addUsuariosStore(usuariosDB.data.result));
    }

    const startBuscarUsuario = (id) => {
        
        dispatch(buscarUsuarioStore({id}));
    }

    const startUpdateUsuario = async(id, nuevo) => {

        const {name, email, password} = nuevo;
        let data = {
            _id:usuarioSeleccionado._id,
            name:name,
            email:email,
            rol:usuarioSeleccionado.rol
        }
        if(password){
            
            await canencioApi.put(`/usuarios/update/${id}`,{name, email, password});
            dispatch(updateUsuarioStore({id, data}));
        
        }else{

            await canencioApi.put(`/usuarios/update/${id}`,{name, email});
            dispatch(updateUsuarioStore({id, data}));
        }
    }
    
    const startDeleteUsuario = async(id) => {

        await canencioApi.delete(`/usuarios/delete/${id}`);
        dispatch(deleteUsuarioStore({id}));
    }

    return {
        //propiedades
        usuarios,
        usuarioSeleccionado,
    
        //metodos
        startCreateUsuario,
        startReadUsuarios,
        startBuscarUsuario,
        startUpdateUsuario,
        startDeleteUsuario
    }
}