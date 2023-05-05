import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  movimientos : []
}

export const movimientosSlice = createSlice({
  name: 'movimientos',
  initialState,
  reducers: {
    addMovimientosStore : (state, {payload}) => {
      state.movimientos = payload;
    },
    resetMovimientosStore : (state) => {
      state.movimientos = [];
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  addMovimientosStore,
  resetMovimientosStore} = movimientosSlice.actions

export default movimientosSlice.reducer