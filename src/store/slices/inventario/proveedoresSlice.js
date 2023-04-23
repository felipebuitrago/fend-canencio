import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  proveedores : [
    {
      _id : undefined,
      nombre: undefined,
      contacto: undefined
    }
  ]
}

export const proveedoresSlice = createSlice({
  name: 'proveedores',
  initialState,
  reducers: {
    createProveedorStore : () => {console.log("createProveedor")},
    readProveedoresStore : () => {console.log("readProveedores")},
    updateProveedorStore : () => {console.log("updateProveedor")},
    deleteProveedorStore : () => {console.log("deleteProveedor")},
  },
})

// Action creators are generated for each case reducer function
export const { 
  createProveedorStore,
  readProveedoresStore,
  updateProveedorStore,
  deleteProveedorStore} = proveedoresSlice.actions

export default proveedoresSlice.reducer