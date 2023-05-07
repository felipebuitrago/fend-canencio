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

        const result = await canencioApi.get('/usuarios');
        dispatch(addUsuariosStore(result.data.result));
        localStorage.setItem('token', result.data.newToken);
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
            
            const result = await canencioApi.put(`/usuarios/update/${id}`,{name, email, password});
            dispatch(updateUsuarioStore({id, data}));
            localStorage.setItem('token', result.data.newToken);
        
        }else{

            const result = await canencioApi.put(`/usuarios/update/${id}`,{name, email});
            dispatch(updateUsuarioStore({id, data}));
            localStorage.setItem('token', result.data.newToken);
        }
    }
    
    const startDeleteUsuario = async(id) => {

        const result = await canencioApi.delete(`/usuarios/delete/${id}`);
        dispatch(deleteUsuarioStore({id}));
        localStorage.setItem('token', result.data.newToken);
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