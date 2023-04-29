import { useDispatch, useSelector } from 'react-redux';
import { canencioApi } from '../../api';

import { createPacienteStore,
        addPacientesStore,
        updatePacienteStore,
        deletePacienteStore } from '../../store/slices';

export const usePacientesStore = () => {
  
    const dispatch = useDispatch();
    const { pacientes } = useSelector(state => state.pacientes);

    const startCreatePaciente = () => {
        //TODO: create OPERATION

        dispatch(createPacienteStore());
    }
    
    const startReadPacientes = async() => {

        const pacientesDB = await canencioApi.get('/pacientes');
        dispatch(addPacientesStore(pacientesDB.data.result));
    }

    const startUpdatePaciente = (id, data) => {

        //TODO: UPDATE OPERATION


        dispatch(updatePacienteStore({id, data}));
    }
    
    const startDeletePaciente = (id) => {

        //TODO: DELETE OPERATION


        dispatch(deletePacienteStore({id}));
    }


    return {
        //propiedades
        pacientes,
    
        //metodos
        startCreatePaciente,
        startReadPacientes,
        startUpdatePaciente,
        startDeletePaciente
    }
}