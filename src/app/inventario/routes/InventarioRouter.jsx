import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { InventarioView } from '../views/InventarioView'
import { 
  InicioPage,
  MovimientosPage,
  RealizarTransaccionPage,
  AdminProducts,
  AdminCategories, /*importando todas las pages en una sola linea con index.js*/
  AdminProveedores,
  AdminPacientes,
  AdminStores,
  AdminByStore,
  AdminUsers } from "../pages";


export const InventarioRouter = () => {
  return (
    
    <Routes>

        <Route path='/' element={ <InventarioView /> } >

           <Route path='' element={ <InicioPage /> } /> 

           <Route path='movimientos' element={ <MovimientosPage /> } /> 
           <Route path='transaccion' element={ <RealizarTransaccionPage /> } /> 
           <Route path='productos' element={ <AdminProducts /> } /> 
           <Route path='categorias' element={ <AdminCategories /> } /> 
           <Route path='proveedores' element={ <AdminProveedores /> } /> 
           <Route path='pacientes' element={ <AdminPacientes /> } /> 

           <Route path='almacenes' element={ <AdminStores /> } > 
              <Route path=':almacen' 
                      element={ <AdminByStore /> } />
           </Route>  

           <Route path='usuarios' element={ <AdminUsers /> } /> 

        </Route>

        <Route path='/*' element={ <Navigate to="/inventario" /> } />

    </Routes>

  )
}
