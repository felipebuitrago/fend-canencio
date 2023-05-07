import { configureStore } from '@reduxjs/toolkit';
import { 
    authSlice,
    almacenesSlice,
    categoriasSlice,
    pacientesSlice,
    productosSlice,
    proveedoresSlice,
    usuariosSlice,
    movimientosSlice } from './slices';

export const store = configureStore({

    reducer : {
        auth       : authSlice.reducer,
        almacenes  : almacenesSlice.reducer,
        categorias : categoriasSlice.reducer,
        pacientes  : pacientesSlice.reducer,
        productos  : productosSlice.reducer,
        proveedores: proveedoresSlice.reducer,
        usuarios   : usuariosSlice.reducer,
        movimientos: movimientosSlice.reducer
    },
})