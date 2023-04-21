import { configureStore } from '@reduxjs/toolkit';
import { inventarioSlice, authSlice } from './slices';

export const store = configureStore({

    reducer : {
        auth : authSlice.reducer,
        inventario : inventarioSlice.reducer,
    },
})