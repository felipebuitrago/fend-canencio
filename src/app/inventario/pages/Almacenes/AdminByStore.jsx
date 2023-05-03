import { Divider, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useProductosStore, useAlmacenesStore } from '../../../../hooks'
import { SearchBar, TablePaginationActions, CustomTableV2, CustomBreadcrumbs, ButtonLink } from '../../components';
export const AdminByStore = () => {
  // Estado para la búsqueda de usuarios
  const [search, setSearch] = React.useState("");
  // Estados para la paginación de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // Estado para el almacen seleccionado
  const [selectedStore, setSelectedStore] = React.useState("");

  const {
    productos,
    startReadProductos,
    startUpdateProducto,
    startDeleteProducto,
  } = useProductosStore();

  const {
    almacenes,
    startReadAlmacenes, // Método para leer almacenes
    // ... (otros métodos)
  } = useAlmacenesStore(); // Usar useAlmacenesStore

  useEffect(() => {
    startReadProductos();
    startReadAlmacenes();
  }, []);

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  const columns = [
    { id: "id", label: "ID", align: "left" },
    { id: "nombre", label: "Nombre", align: "center" },
    { id: "presentacion", label: "Presentación/Talla", align: "center" },
    { id: "proveedor", label: "Proveedor", align: "center" },
    { id: "categoria", label: "Categorías", align: "center" },
    { id: "stock", label: "Stock", align: "center" },
    { id: "acciones", label: "Acciones", align: "center" },
  ];

  const rows = productos;
  
  {/* evento de editar cierto producto */}
  const handleUpdateClick = (event) => {
    const productSample = {
      "_id": "64443852d67e",
      "idpersonalizado": "elemental_04",
      "nombre": "gordas feas",
      "presentacion": "xxxl",
      "stock": 15,
      "isFaja": true,
      "proveedor": {
          "nombre": "FAJAS LA FEA",
          "contacto": "31245648584",
          "cc": "123456489"
      },
      "registradopor": {
          "name": "juan",
          "email": "felipe@butrago.com"
      },
      "almacen": [
          {
              "name": "elemental"
          }
      ],
      "categoria": [
          {
              "name": "Fajas",
              "description": "las mejores fajas"
          }
      ]
    }
    if(event.target.id!==""){

      
      startUpdateProducto(event.target.id,productSample);
    }
    else{
      startUpdateProducto(event.target.farthestViewportElement.id,productSample);
    }
  };   
  
  {/* evento de eliminar cierto producto */}
  const handleDeleteClick = (event) => {

    if(event.target.id!==""){
      startDeleteProducto(event.target.id);
    }
    else{
      startDeleteProducto(event.target.farthestViewportElement.id);
    }
  };   
  //filtrar por almacen seleccionado y por busqueda de nombre
  const filteredRowsByStore = rows.filter((product) =>
  selectedStore
    ? product.almacen.some((store) => store.name === selectedStore)
    : true
);

const filteredRows = filteredRowsByStore.filter((product) =>
  product.nombre.toLowerCase().includes(search.toLowerCase())
);
  
  // Calcula el número de filas vacías para rellenar la tabla
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);
  
  //handle paginacion
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //handle paginas por pagina
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      {/* CustomBreadcrumbs */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3, width: "100%" }}
      >
        <Paper
          elevation={1}
          sx={{ p: 1, borderRadius: 1, width: "100%" }}
        >
          <CustomBreadcrumbs
            pathList={[
              { name: "Inventario", route: "/inventario" },
              { name: "Administración por almacen" },
            ]}
          />
        </Paper>
      </Grid>
      {/* main grid */}
      <Grid container direction="column">
        {/* barra superior, btn crear y busqueda */}
        <Grid container direction="row" justifyContent="space-between">
          {/* L. Titulo Pagina y btn crear */}
          <Grid direction="column">
          <FormControl fullWidth>
            <InputLabel id="store-select-label">Almacen</InputLabel>
            <Select
              labelId="store-select-label"
              id="store-select"
              value={selectedStore}
              label="Almacen"
              onChange={handleStoreChange}
            >
              {/* Mapear la lista de almacenes para crear las opciones del Select */}
              {almacenes.map((store) => ( // Usar almacenes en lugar de stores
                <MenuItem key={store.id} value={store.name}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
            <Typography variant="h6" display="inline">
                Productos
              </Typography>
              <Typography
                variant="subtitle1"
                display="inline"
                sx={{ ml: 0.9 }}
              >
                {`${filteredRowsByStore.length} total`}
            </Typography>
          
           
          </Grid>

          {/* R. componentes de busqueda */}
          <Grid direction="column" display="flex">
            <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
          </Grid>
        </Grid>
        {/* fin barra superior */}

        <Divider sx={{ mt: 2 }} />

        {/* tabla display data */}
        <Grid container direction="column" sx={{ mt: 2 }}>
          <CustomTableV2
            columns={columns}
            filteredRows={filteredRows}
            page={page}
            rowsPerPage={rowsPerPage}
            emptyRows={emptyRows}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            TablePaginationActions={TablePaginationActions}
            updateHandleClick={handleUpdateClick}
            deleteHandleClick={handleDeleteClick}
          />
        </Grid>
        
      </Grid>
    </>
  );
};
