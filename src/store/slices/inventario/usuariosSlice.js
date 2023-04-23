import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usuarios : [
    {
      _id : undefined,
      name: undefined,
      email: undefined
    }
  ]
}

export const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    createUsuarioStore : () => {console.log("createUsuario")},
    readUsuariosStore : () => {console.log("readUsuarios")},
    updateUsuarioStore : () => {console.log("updateUsuario")},
    deleteUsuarioStore : () => {console.log("deleteUsuario")},
  },
})

// Action creators are generated for each case reducer function
export const { 
  createUsuarioStore,
  readUsuariosStore,
  updateUsuarioStore,
  deleteUsuarioStore } = usuariosSlice.actions

export default usuariosSlice.reducer