import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { InventarioView } from '../views/InventarioView'
import { 
  InicioPage,
 
  MovimientosPage,
  RealizarTransaccionPage,
 
  ProductosIndex,
  AdminProducts,
  CreateProducto,
  EditProducto,
 
  CategoriasIndex,
  AdminCategories, /*importando todas las pages en una sola linea con index.js*/
  CreateCategoria,
  EditCategoria,

  PacientesIndex,
  AdminPacientes,
  EditPaciente,
  CreatePaciente,
  
  ProveedoresIndex,
  AdminProveedores,
  CreateProveedor,
  EditProveedor,

  AlmacenesIndex,
  AdminStores,
  AdminByStore,
  CreateStore,
  
  UsuariosIndex,
  AdminUsers,
  CreateUsuario,
  EditUsuario

} from "../pages";


export const InventarioRouter = () => {
  return (
    
    <Routes>
        <Route path='/' element={ <InventarioView /> } >

           <Route path='' element={ <InicioPage /> } /> 

           <Route path='movimientos' element={ <MovimientosPage /> } /> 
           <Route path='transaccion' element={ <RealizarTransaccionPage /> } /> 
           
           {/* Rutas para el modulo "productos" */}
           <Route path='productos' element={ <ProductosIndex /> }>
              <Route path='' 
                      element={ <AdminProducts /> } />
              <Route path='crear' 
                      element={ <CreateProducto /> } />
              <Route path='editar' 
                      element={ <EditProducto /> } />
            </Route> 

           {/* Rutas para el modulo "categorias" */}
           <Route path='categorias' element={ <CategoriasIndex /> }>
              <Route path='' 
                      element={ <AdminCategories /> } />
              <Route path='crear' 
                      element={ <CreateCategoria /> } />
              <Route path='editar' 
                      element={ <EditCategoria /> } />
           </Route>

           {/* Rutas para el modulo "proveedores" */} 
           <Route path='proveedores' element={ <ProveedoresIndex /> }>
              <Route path='' 
                      element={ <AdminProveedores /> } />
              <Route path='crear' 
                      element={ <CreateProveedor /> } />
              <Route path='editar' 
                      element={ <EditProveedor /> } />
            </Route> 

           {/* Rutas para el modulo "pacientes" */}
           <Route path='pacientes' element={ <PacientesIndex /> }>
              <Route path='' 
                      element={ <AdminPacientes /> } />
              <Route path='crear' 
                      element={ <CreatePaciente /> } />
              <Route path='editar' 
                      element={ <EditPaciente /> } />
            </Route> 

          {/* Rutas para el modulo "almacenes" */}
           <Route path='almacenes' element={ <AlmacenesIndex /> } > 
              <Route path='' 
                      element={ <AdminStores /> } />
              <Route path=':almacen' 
                      element={ <AdminByStore /> } />
              <Route path='crear' 
                      element={ <CreateStore /> } />
           </Route>  
          
          {/* Rutas para el modulo "usuarios" */}
           <Route path='usuarios' element={ <UsuariosIndex /> } >
              <Route path='' 
                      element={ <AdminUsers /> } />
              <Route path='crear' 
                      element={ <CreateUsuario /> } />
              <Route path='editar' 
                      element={ <EditUsuario /> } />
           </Route> 

        </Route>

        <Route path='/*' element={ <Navigate to="/" /> } />

    </Routes>

  )
}
