import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  usuarios : [],
  usuarioSeleccionado : {name:"",rol:"",email:""}
}

export const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState,
  reducers: {
    createUsuarioStore : (state,{payload}) => {
      state.usuarios.unshift(payload);
    },
    addUsuariosStore : (state,{payload}) => {
      state.usuarios = payload;
    },
    buscarUsuarioStore : (state, {payload}) => {
      let position;
      state.usuarios.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      
      state.usuarioSeleccionado = {...state.usuarios[position]};
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
      state.usuarioSeleccionado = {name:"",rol:"",email:""};
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  createUsuarioStore,
  addUsuariosStore,
  buscarUsuarioStore,
  updateUsuarioStore,
  deleteUsuarioStore,
  resetUsuariosStore } = usuariosSlice.actions

export default usuariosSlice.reducer