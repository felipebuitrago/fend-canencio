import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  almacenes : []
}

const almacenSample = {
  "_id"    : "50ec99xxx9c5bb44822945",
  "name" : "420Store",
  "location": "Palermo"
}

export const almacenesSlice = createSlice({
  name: 'almacenes',
  initialState,
  reducers: {
    createAlmacenStore : (state, {payload}) => {
      state.almacenes.unshift(almacenSample);
    },
    addAlmacenesStore : (state, {payload}) => {
      state.almacenes = payload;
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
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  createAlmacenStore,
  addAlmacenesStore,
  updateAlmacenStore,
  deleteAlmacenStore,
  resetAlmacenesStore} = almacenesSlice.actions

export default almacenesSlice.reducer