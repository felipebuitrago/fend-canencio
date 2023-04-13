import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {InventarioView} from '../views/InventarioView'

export const InventarioRouter = () => {
  return (
    
    <Routes>

        <Route path='/' element={ <InventarioView /> } />

        <Route path='/*' element={ <Navigate to="/inventario" /> } />

    </Routes>

  )
}
