import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productos : [],
  productoSeleccionado : {
    nombre: "",
    presentacion: "",
    stock: 0,
    proveedor: {},
    almacen: [{name:""}],
    categoria: []
  }
}

export const productosSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    createProductoStore : (state,{payload}) => {
      state.productos.unshift(payload)
    },
    addProductosStore : (state,{payload}) => {
      state.productos = payload;
    },
    buscarProductoStore : (state, {payload}) => {
      let position;
      state.productos.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      
      state.productoSeleccionado = {...state.productos[position]};
    },
    updateProductoStore : (state,{payload}) => {
      let position;
      state.productos.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      state.productos[position]=payload.data;
    },
    deleteProductoStore : (state,{payload}) => {

      let position;
      state.productos.map((product,index) => {
        if(product._id === payload.id){
          position = index;
        }
      })
      let first  = state.productos.slice(0,position);
      let second = state.productos.slice(position+1,state.productos.length);
      state.productos = first.concat(second);
    },
    resetProductosStore : (state) => {
      state.productos = [];
      state.productoSeleccionado = { nombre: "", presentacion: "", stock: 0, proveedor: {}, almacen: [{name:""}], categoria: [] };
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
   createProductoStore,
   addProductosStore,
   buscarProductoStore,
   updateProductoStore,
   deleteProductoStore,
   resetProductosStore } = productosSlice.actions

export default productosSlice.reducer