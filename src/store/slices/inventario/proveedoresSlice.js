import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  proveedores : []
}

const proveedorSample = {
  "_id"      : "0ca6e94dfc0b89a4e227",
  "nombre"   : "el popo",
  "contacto" : "31245648584"
}

export const proveedoresSlice = createSlice({
  name: 'proveedores',
  initialState,
  reducers: {
    createProveedorStore : (state,{payload}) => {
      state.proveedores.unshift(proveedorSample)
    },
    addProveedoresStore : (state,{payload}) => {
      state.proveedores = payload;
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
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  createProveedorStore,
  addProveedoresStore,
  updateProveedorStore,
  deleteProveedorStore,
  resetProveedoresStore} = proveedoresSlice.actions

export default proveedoresSlice.reducer