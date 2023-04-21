import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  autorizado: true,
  usuario: "canencio",
  token:"jwt",
  proveedores:[{
      id:"idproveedor",
      nombre:"nombreProveedor",
      direccion:"direccionProveedor",
      contacto:"contactoProveedor"
    },
    {
      id:"idproveedor",
      nombre:"nombreProveedor",
      direccion:"direccionProveedor",
      contacto:"contactoProveedor"
  }],
  productos:[{
      id:"idproducto",
      nombre:"nombreProducto",
      stock:10,
      presentacion:"presentacionProducto",
      almacen:"idAlmacen",
      proveedor:"idProveedor",
      categoria:"idCategoria"
  }]
}

export const inventarioSlice = createSlice({
  name: 'inventario',
  initialState,
  reducers: {
  },
})

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = inventarioSlice.actions

export default inventarioSlice.reducer