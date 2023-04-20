import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const AdminCategories = () => {
  return (
    <>
      <div>AdminCategories 
      
          <Link to='crear'>
            <Button variant='contained'>Crear</Button>
          </Link>
        
      
          <Link to='editar'>
            <Button variant='contained'>Editar</Button>
          </Link>
        
      </div>
    </>
  )
}
