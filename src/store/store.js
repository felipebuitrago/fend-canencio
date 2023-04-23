import { configureStore } from '@reduxjs/toolkit';
import { 
    authSlice,
    almacenesSlice,
    categoriasSlice,
    inventarioSlice,
    pacientesSlice,
    productosSlice,
    proveedoresSlice,
    usuariosSlice } from './slices';

export const store = configureStore({

    reducer : {
        auth       : authSlice.reducer,
        almacenes  : almacenesSlice.reducer,
        categorias : categoriasSlice.reducer,
        inventario : inventarioSlice.reducer,
        pacientes  : pacientesSlice.reducer,
        productos  : productosSlice.reducer,
        proveedores: proveedoresSlice.reducer,
        usuarios   : usuariosSlice.reducer
    },
})