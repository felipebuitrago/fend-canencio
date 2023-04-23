import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  movimientos : [
    {
      _id : undefined,
      tipodetransaccion: undefined,
      producto: "producto",
      almacen: "almacen",
      paciente: "paciente",
      factura: "factura456",
      fecha: undefined,
      cantidad: 15,
      registradopor: "usuarioName",
      nota: "name"
    }
  ]
}

export const inventarioSlice = createSlice({
  name: 'inventario',
  initialState,
  reducers: {
    createMovimientoStore : () => {console.log("createMovimiento")},
    readMovimientosStore : () => {console.log("readMovimientos")},
  },
})

// Action creators are generated for each case reducer function
export const { createMovimientoStore, readMovimientosStore } = inventarioSlice.actions

export default inventarioSlice.reducer