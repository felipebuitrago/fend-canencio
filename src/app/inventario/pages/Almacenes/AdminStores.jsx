import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export const AdminStores = () => {
  return (
    <>
      <div>AdminStores 
        <Link to='crear'>
          <Button variant='contained'>Crear</Button>
        </Link>
      </div>
      
    </>
  )
}
