import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const AdminProducts = () => {
  return (
    <>
      <div>AdminProducts 
      
          <Link to='crear'>
            <Button variant='contained' color='success'>Crear</Button>
          </Link>
        
      
          <Link to='editar'>
            <Button variant='contained'>Editar</Button>
          </Link>
        
      </div>
      
    </>
  )
}
