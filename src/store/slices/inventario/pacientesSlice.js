import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pacientes : []
}

const pacienteSample = {
  "_id"    : "50ec999c5bb44822945",
  "name" : "soto",
  "contact": "inferno"
}

export const pacientesSlice = createSlice({
  name: 'pacientes',
  initialState,
  reducers: {
    createPacienteStore : (state,{payload}) => {
      state.pacientes.unshift(pacienteSample);
    },
    addPacientesStore : (state,{payload}) => {
      state.pacientes = payload;
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
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  createPacienteStore,
  addPacientesStore,
  updatePacienteStore,
  deletePacienteStore,
  resetPacientesStore} = pacientesSlice.actions

export default pacientesSlice.reducer