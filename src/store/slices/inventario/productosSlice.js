import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  productos:[]
}

const productSample = {
  "_id": "64443852d67e",
  "idpersonalizado": "elemental_04",
  "nombre": "gordas feas",
  "presentacion": "xxxl",
  "stock": 15,
  "isFaja": true,
  "proveedor": {
      "nombre": "FAJAS LA FEA",
      "contacto": "31245648584",
      "cc": "123456489"
  },
  "registradopor": {
      "name": "juan",
      "email": "felipe@butrago.com"
  },
  "almacen": [
      {
          "name": "elemental"
      }
  ],
  "categoria": [
      {
          "name": "Fajas",
          "description": "las mejores fajas"
      }
  ]
}

export const productosSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    createProductoStore : (state,{payload}) => {
      state.productos.unshift(productSample)
    },
    addProductosStore : (state,{payload}) => {
      state.productos = payload;
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
    },
  },
})

// Action creators are generated for each case reducer function
export const { createProductoStore,
   addProductosStore,
   updateProductoStore,
   deleteProductoStore,
   resetProductosStore } = productosSlice.actions

export default productosSlice.reducer