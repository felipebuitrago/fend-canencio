import React from 'react'
import { useParams } from 'react-router-dom'

export const AdminByStore = () => {

  const params = useParams();

  return (
    <>
      <div>AdminByStore: {params.almacen}</div>
      {
        console.log(params)
      }
    </>
  )
}
