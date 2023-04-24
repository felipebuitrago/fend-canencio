import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginView } from '../views/LoginView.jsx'

export const AuthRouter = () => {
  return (
    
    <Routes>

        <Route path='/' element={ <LoginView /> } />

        <Route path='/*' element={ <Navigate to="/" /> } />

    </Routes>

  )
}