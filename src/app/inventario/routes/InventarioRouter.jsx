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

  PacientesIndex,
  AdminPacientes,
  CreatePaciente,
  
  ProveedoresIndex,
  AdminProveedores,
  CreateProveedor,

  AlmacenesIndex,
  AdminStores,
  AdminByStore,
  CreateStore,
  
  UsuariosIndex,
  AdminUsers,
  CreateUsuario,

} from "../pages";

import { useAuthStore } from '../../../hooks';

export const InventarioRouter = () => {

	const { user } = useAuthStore();

	if(user.rol === "Administrador"){
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
				   </Route>
		
				   {/* Rutas para el modulo "proveedores" */} 
				   <Route path='proveedores' element={ <ProveedoresIndex /> }>
					  <Route path='' 
							  element={ <AdminProveedores /> } />
					  <Route path='crear' 
							  element={ <CreateProveedor /> } />
					</Route> 
		
				   {/* Rutas para el modulo "pacientes" */}
				   <Route path='pacientes' element={ <PacientesIndex /> }>
					  <Route path='' 
							  element={ <AdminPacientes /> } />
					  <Route path='crear' 
							  element={ <CreatePaciente /> } />
					</Route> 
		
				  {/* Rutas para el modulo "almacenes" */}
				   <Route path='almacenes' element={ <AlmacenesIndex /> } > 
					  <Route path='' 
							  element={ <AdminStores /> } />
					  <Route path='por-almacen' 
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
				   </Route> 
				</Route>
				<Route path='/*' element={ <Navigate to="/" /> } />
			</Routes>
		)
	}
	else if(user.rol === "Colaborador"){
		return (
			<Routes>
				<Route path='/' element={ <InventarioView /> } >
		
				   <Route path='' element={ <InicioPage /> } /> 
		
				   <Route path='movimientos' element={ <MovimientosPage /> } /> 
				   <Route path='transaccion' element={ <RealizarTransaccionPage /> } /> 
		
				   {/* Rutas para el modulo "pacientes" */}
				   <Route path='pacientes' element={ <PacientesIndex /> }>
					  <Route path='' 
							  element={ <AdminPacientes /> } />
					  <Route path='crear' 
							  element={ <CreatePaciente /> } />
					</Route> 
				</Route>
				<Route path='/*' element={ <Navigate to="/" /> } />
			</Routes>
		)
	}	
}
