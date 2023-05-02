import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  almacenes : [],
  almacenSeleccionado : {name:"",location:""}
}

export const almacenesSlice = createSlice({
  name: 'almacenes',
  initialState,
  reducers: {
    createAlmacenStore : (state, {payload}) => {
      state.almacenes.unshift(payload);
    },
    addAlmacenesStore : (state, {payload}) => {
      state.almacenes = payload;
    },
    buscarAlmacenStore : (state, {payload}) => {
      let position;
      state.almacenes.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      
      state.almacenSeleccionado = {...state.almacenes[position]};
    },
    updateAlmacenStore : (state, {payload}) => {
      let position;
      state.almacenes.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      state.almacenes[position]=payload.data;
    },
    deleteAlmacenStore : (state, {payload}) => {
      let position;
      state.almacenes.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      let first  = state.almacenes.slice(0,position);
      let second = state.almacenes.slice(position+1,state.almacenes.length);
      state.almacenes = first.concat(second);
    },
    resetAlmacenesStore : (state) => {
      state.almacenes = [];
      state.almacenSeleccionado = {name:"",location:""};
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  createAlmacenStore,
  addAlmacenesStore,
  buscarAlmacenStore,
  updateAlmacenStore,
  deleteAlmacenStore,
  resetAlmacenesStore} = almacenesSlice.actions

export default almacenesSlice.reducer