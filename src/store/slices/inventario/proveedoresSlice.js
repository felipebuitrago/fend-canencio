import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  proveedores : [],
  proveedorSeleccionado : {nombre:"",contacto:""}
}

export const proveedoresSlice = createSlice({
  name: 'proveedores',
  initialState,
  reducers: {
    createProveedorStore : (state,{payload}) => {
      state.proveedores.unshift(payload);
    },
    addProveedoresStore : (state,{payload}) => {
      state.proveedores = payload;
    },
    buscarProveedorStore : (state, {payload}) => {
      let position;
      state.proveedores.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      
      state.proveedorSeleccionado = {...state.proveedores[position]};
    },
    updateProveedorStore : (state,{payload}) => {
      let position;
      state.proveedores.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      state.proveedores[position]=payload.data;
    },
    deleteProveedorStore : (state,{payload}) => {

      let position;
      state.proveedores.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      let first  = state.proveedores.slice(0,position);
      let second = state.proveedores.slice(position+1,state.proveedores.length);
      state.proveedores = first.concat(second);
    },
    resetProveedoresStore : (state) => {
      state.proveedores = [];
      state.proveedorSeleccionado = {nombre:"",contacto:""}
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  createProveedorStore,
  addProveedoresStore,
  buscarProveedorStore,
  updateProveedorStore,
  deleteProveedorStore,
  resetProveedoresStore} = proveedoresSlice.actions

export default proveedoresSlice.reducer