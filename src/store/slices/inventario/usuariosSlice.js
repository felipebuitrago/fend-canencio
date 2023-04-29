import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usuarios : []
}

const userSample = {
  "_id" : "092c1cad1eca052ac4",
  "name" : "Spiderman",
  "email" : "sudo",
  "rol" : "Colaborador"
}

export const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    createUsuarioStore : () => {
      
    },
    addUsuariosStore : () => {
      
    },
    updateUsuarioStore : () => {
      
    },
    deleteUsuarioStore : () => {
      
    },
    resetUsuariosStore : () => {
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  createUsuarioStore,
  addUsuariosStore,
  updateUsuarioStore,
  deleteUsuarioStore,
  resetUsuariosStore } = usuariosSlice.actions

export default usuariosSlice.reducer