import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pacientes : [],
  pacienteSeleccionado : {name:"",contact:""}
}

export const pacientesSlice = createSlice({
  name: 'pacientes',
  initialState,
  reducers: {
    createPacienteStore : (state,{payload}) => {
      state.pacientes.unshift(payload);
    },
    addPacientesStore : (state,{payload}) => {
      state.pacientes = payload;
    },
    buscarPacienteStore : (state, {payload}) => {
      let position;
      state.pacientes.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      
      state.pacienteSeleccionado = {...state.pacientes[position]};
    },
    updatePacienteStore : (state,{payload}) => {
      let position;
      state.pacientes.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      state.pacientes[position]=payload.data;
    },
    deletePacienteStore : (state,{payload}) => {
      let position;
      state.pacientes.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      let first  = state.pacientes.slice(0,position);
      let second = state.pacientes.slice(position+1,state.pacientes.length);
      state.pacientes = first.concat(second);
    },
    resetPacientesStore : (state,{payload}) => {
      state.pacientes = [];
      state.pacienteSeleccionado = {name:"",contact:""}
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  createPacienteStore,
  addPacientesStore,
  buscarPacienteStore,
  updatePacienteStore,
  deletePacienteStore,
  resetPacientesStore} = pacientesSlice.actions

export default pacientesSlice.reducer