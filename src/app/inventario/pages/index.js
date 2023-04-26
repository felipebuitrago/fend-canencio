
export * from './InicioPage'

export * from './Inventario/MovimientosPage'
export * from './Inventario/RealizarTransaccionPage'

export * from './Almacenes/AlmacenesIndex'
export * from './Almacenes/AdminByStore'
export * from './Almacenes/AdminStores'
export * from './Almacenes/CreateStore'

export * from './Productos/Categorias/CategoriasIndex'
export * from './Productos/Categorias/AdminCategories'
export * from './Productos/Categorias/CreateCategoria'
export * from './Productos/Categorias/EditCategoria'

export * from './Productos/ProductosIndex'
export * from './Productos/AdminProducts'
export * from './Productos/CreateProducto'
export * from './Productos/EditProducto'

export * from './Terceros/Pacientes/PacientesIndex'
export * from './Terceros/Pacientes/AdminPacientes'
export * from './Terceros/Pacientes/CreatePaciente'
export * from './Terceros/Pacientes/EditPaciente'

export * from './Terceros/Proveedores/ProveedoresIndex'
export * from './Terceros/Proveedores/AdminProveedores'
export * from './Terceros/Proveedores/CreateProveedor'
export * from './Terceros/Proveedores/EditProveedor'

export * from './Usuarios/UsuariosIndex'
export * from './Usuarios/AdminUsers'
export * from './Usuarios/CreateUsuario'
export * from './Usuarios/EditUsuario'

/*
    archivo de barril para importar todos los componente con una sola referencia 
    a este
    Sisa pa' aquí van los componentes que se usan en varias partes de la app
*/


export { default as CustomBreadcrumbs } from "../components/CustomBreadcrumbs.jsx";
export { default as TablePaginationActions } from "../components/TablePagination.jsx";
export { default as EditButton } from "../components/EditButton.jsx";
export { default as DeleteButton } from "../components/DeleteButton.jsx";
export { default as CustomTable } from "../components/CustomTable.jsx";
export { default as SearchBar } from "../components/SearchBar.jsx";
export { default as AlertSnackbar } from "../components/AlertSnackbar.jsx";
export { default as DeleteConfirmDialog } from "../components/DeleteConfirmDialog.jsx";