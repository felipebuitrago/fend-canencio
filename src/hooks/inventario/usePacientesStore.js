import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { createPacienteStore,
        addPacientesStore,
        buscarPacienteStore,
        updatePacienteStore,
        deletePacienteStore } from '../../store/slices';

export const usePacientesStore = () => {
  
    const dispatch = useDispatch();
    const { pacientes, pacienteSeleccionado } = useSelector(state => state.pacientes);

    const startCreatePaciente = async(name,contact) => {

        const result = await canencioApi.post('/pacientes/new',{name,contact});

        dispatch(createPacienteStore(result.data.result));
        localStorage.setItem('token', result.data.newToken);
    }
    
    const startReadPacientes = async() => {

        const result = await canencioApi.get('/pacientes');
        dispatch(addPacientesStore(result.data.result));
        localStorage.setItem('token', result.data.newToken);
    }

    const startBuscarPaciente = (id) => {
        
        dispatch(buscarPacienteStore({id}));
    }

    const startUpdatePaciente = async(id, data) => {

        const {name,contact} = data;
        const result = await canencioApi.put(`/pacientes/update/${id}`,{name,contact});

        dispatch(updatePacienteStore({id, data}));
        localStorage.setItem('token', result.data.newToken);
    }
    
    const startDeletePaciente = async(id) => {

        const result = await canencioApi.delete(`/pacientes/delete/${id}`);

        dispatch(deletePacienteStore({id}));
        localStorage.setItem('token', result.data.newToken);
    }


    return {
        //propiedades
        pacientes,
        pacienteSeleccionado,
    
        //metodos
        startCreatePaciente,
        startReadPacientes,
        startBuscarPaciente,
        startUpdatePaciente,
        startDeletePaciente
    }
}