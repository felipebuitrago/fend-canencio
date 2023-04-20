import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {InventarioView} from '../views/InventarioView'
import { RealizarTransaccionPage } from "../pages/Inventario/RealizarTransaccionPage";
import { MovimientosPage } from "../pages/Inventario/MovimientosPage";

export const InventarioRouter = () => {
  return (
    
    <Routes>

        <Route path='/' element={ <InventarioView /> } >
           <Route path='movimientos' element={ <MovimientosPage /> } /> 
           <Route path='transaccion' element={ <RealizarTransaccionPage /> } /> 
           <Route path='productos' element={ <RealizarTransaccionPage /> } /> 
           <Route path='categorias' element={ <RealizarTransaccionPage /> } /> 
           <Route path='proveedores' element={ <RealizarTransaccionPage /> } /> 
           <Route path='pacientes' element={ <RealizarTransaccionPage /> } /> 
           <Route path='almacenes' element={ <RealizarTransaccionPage /> } /> 
           {/* <Route path='transaccion' element={ <RealizarTransaccionPage /> } />  ruta hija  */}
           <Route path='usuarios' element={ <RealizarTransaccionPage /> } /> 
        </Route>

        <Route path='/*' element={ <Navigate to="/inventario" /> } />

    </Routes>

  )
}
