import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categorias : []
}

const categoriaSample = {
  "_id"    : "50ec999c5bb44822945",
  "name" : "Crononicaca",
  "description": "la mera caca"
}

export const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    createCategoriaStore : (state,{payload}) => {
      state.categorias.unshift(categoriaSample);
    },
    addCategoriasStore : (state,{payload}) => {
      state.categorias = payload;
    },
    updateCategoriaStore : (state,{payload}) => {
      let position;
      state.categorias.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      state.categorias[position]=payload.data;
    },
    deleteCategoriaStore : (state,{payload}) => {
      let position;
      state.categorias.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      let first  = state.categorias.slice(0,position);
      let second = state.categorias.slice(position+1,state.categorias.length);
      state.categorias = first.concat(second);
    },
    resetCategoriasStore : (state) => {
      state.categorias = [];
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  createCategoriaStore,
  addCategoriasStore,
  updateCategoriaStore,
  deleteCategoriaStore,
  resetCategoriasStore} = categoriasSlice.actions

export default categoriasSlice.reducer