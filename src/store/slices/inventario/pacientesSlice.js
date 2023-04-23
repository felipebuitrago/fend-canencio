import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pacientes : [
    {
      _id : undefined,
      nombre: undefined,
      contacto: undefined
    }
  ]
}

export const pacientesSlice = createSlice({
  name: 'pacientes',
  initialState,
  reducers: {
    createPacienteStore : () => {console.log("createPaciente")},
    readPacientesStore : () => {console.log("readPaciente")},
    updatePacienteStore : () => {console.log("updatePaciente")},
    deletePacienteStore : () => {console.log("deletePaciente")},
  },
})

// Action creators are generated for each case reducer function
export const { 
  createPacienteStore,
  readPacientesStore,
  updatePacienteStore,
  deletePacienteStore} = pacientesSlice.actions

export default pacientesSlice.reducer