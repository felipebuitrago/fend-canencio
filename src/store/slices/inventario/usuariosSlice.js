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
    createUsuarioStore : (state,{payload}) => {
      state.usuarios.unshift(userSample);
    },
    addUsuariosStore : (state,{payload}) => {
      state.usuarios = payload;
    },
    updateUsuarioStore : (state,{payload}) => {
      let position;
      state.usuarios.map((user,index) => {
        if(user._id === payload.id){
          position = index;
        }
      })
      state.usuarios[position]=payload.data;
    },
    deleteUsuarioStore : (state,{payload}) => {

      let position;
      state.usuarios.map((user,index) => {
        if(user._id === payload.id){
          position = index;
        }
      })
      let first  = state.usuarios.slice(0,position);
      let second = state.usuarios.slice(position+1,state.usuarios.length);
      state.usuarios = first.concat(second);
    },
    resetUsuariosStore : (state) => {
      state.usuarios = [];
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