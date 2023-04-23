import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categorias : [
    {
      _id : undefined,
      name: undefined,
      description: undefined
    }
  ]
}

export const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    createCategoriaStore : () => {console.log("createCategoria")},
    readCategoriasStore : () => {console.log("readCategorias")},
    updateCategoriaStore : () => {console.log("updateCategoria")},
    deleteCategoriaStore : () => {console.log("deleteCategoria")},
  },
})

// Action creators are generated for each case reducer function
export const { 
  createCategoriaStore,
  readCategoriasStore,
  updateCategoriaStore,
  deleteCategoriaStore} = categoriasSlice.actions

export default categoriasSlice.reducer