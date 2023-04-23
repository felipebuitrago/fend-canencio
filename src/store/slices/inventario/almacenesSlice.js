import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  almacenes : [
    {
      _id : undefined,
      name: undefined,
      "location": undefined
    }
  ]
}

export const almacenesSlice = createSlice({
  name: 'almacenes',
  initialState,
  reducers: {
    createAlmacenStore : () => {console.log("createAlmacen")},
    readAlmacenesStore : () => {console.log("readAlmacenes")},
    updateAlmacenStore : () => {console.log("updateAlmacen")},
    deleteAlmacenStore : () => {console.log("deleteAlmacen")},
  },
})

// Action creators are generated for each case reducer function
export const { 
  createAlmacenStore,
  readAlmacenesStore,
  updateAlmacenStore,
  deleteAlmacenStore} = almacenesSlice.actions

export default almacenesSlice.reducer