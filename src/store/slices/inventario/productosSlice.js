import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productos:[{
      _id:"idproducto",
      idpersonalizado:"id01",
      nombre:"nombreProducto",
      stock:10,
      presentacion:"presentacionProducto",
      almacen:"idAlmacen",
      proveedor:"idProveedor",
      categoria:"idCategoria",
      registradopor:"idUser",
      isFaja:undefined
  },
  {
    _id:"idproducto",
    idpersonalizado:"id",
    nombre:"nombreProducto",
    stock:10,
    presentacion:"presentacionProducto",
    almacen:"idAlmacen",
    proveedor:"idProveedor",
    categoria:"idCategoria",
    registradopor:"idUser",
    isFaja:null
  }]
}

export const productosSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    createProductoStore : () => {console.log("createProducto")},
    readProductosStore : () => {console.log("readProductos")},
    updateProductoStore : () => {console.log("updateProducto")},
    deleteProductoStore : () => {console.log("deleteProducto")},
  },
})

// Action creators are generated for each case reducer function
export const { createProductoStore,
   readProductosStore,
   updateProductoStore,
   deleteProductoStore } = productosSlice.actions

export default productosSlice.reducer