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
    }
    
    const startReadPacientes = async() => {

        const pacientesDB = await canencioApi.get('/pacientes');
        dispatch(addPacientesStore(pacientesDB.data.result));
    }

    const startBuscarPaciente = (id) => {
        
        dispatch(buscarPacienteStore({id}));
    }

    const startUpdatePaciente = async(id, data) => {

        const {name,contact} = data;
        await canencioApi.put(`/pacientes/update/${id}`,{name,contact});

        dispatch(updatePacienteStore({id, data}));
    }
    
    const startDeletePaciente = async(id) => {

        await canencioApi.delete(`/pacientes/delete/${id}`);

        dispatch(deletePacienteStore({id}));
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