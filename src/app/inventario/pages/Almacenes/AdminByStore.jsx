import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Divider, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel, Dialog, DialogTitle, IconButton, DialogContent, TextField, DialogActions, Button, FormHelperText } from '@mui/material';
import { SearchBar, TablePaginationActions, CustomTableV2, CustomBreadcrumbs, AlertSnackbar } from '../../components';
import { Close } from '@mui/icons-material';

import { useProductosStore, useAlmacenesStore } from '../../../../hooks'

export const AdminByStore = () => {
  
  // Estado para la búsqueda de usuarios
  const [search, setSearch] = useState("");
  // Estados para la paginación de la tabla
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const [cantidadTrasladar, setCantidadTrasladar] = useState(0);
  
  const onChangeCantidad = (e) => {
    e.preventDefault();
    setCantidadTrasladar(e.target.value);
  }
  
  //alert confirmation
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  
  const {
    productos,
    productoSeleccionado,
    startReadProductos,
    startBuscarProducto,
    startTrasladarProducto,
  } = useProductosStore();
  
  const {
    almacenes,
    startReadAlmacenes, 
  } = useAlmacenesStore(); 
  
  useEffect(() => {
    startReadProductos();
    startReadAlmacenes();
  }, []);
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm({
    defaultValues: {
      almacen: "",
    },
  });
  
  // Estado para el almacen seleccionado
  //const initialStore = (almacenes[0] !== undefined)?almacenes[0].name:"";
  const [selectedStore, setSelectedStore] = useState("");
  
  const handleStoreChange = (event) => {
    setPage(0);
    setSelectedStore(event.target.value);
  };

  const columns = [
    { id: "id", label: "ID", align: "left" },
    { id: "nombre", label: "Nombre", align: "center" },
    { id: "presentacion", label: "Presentación/Talla", align: "center" },
    { id: "proveedor", label: "Proveedor", align: "center" },
    { id: "categoria", label: "Categorías", align: "center" },
    { id: "stock", label: "Stock", align: "center" },
    { id: "acciones-almacen", label: "Acciones", align: "center" },
  ];

  const rows = productos;
  
  {/* evento de editar cierto producto */}
  const handleUpdateClick = (event) => {
    
    if(event.target.id!==""){

      startBuscarProducto(event.target.id);
      handleOpenEditDialog();
    }
    else{
      startBuscarProducto(event.target.farthestViewportElement.id);
      handleOpenEditDialog();
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

  //STATES AND HANDLES DE EDITAR/TRASLADAR DE ALMACEN
  const [openEditDialog, setOpenEditDialog] = useState(false);
  
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };
  
  const handleCloseEditDialog = () => {
    setCantidadTrasladar(0);
    setOpenEditDialog(false);
    reset({
      almacen: "",
    })
  };
  
  //trasladar
  const handleSaveEditDialog = (data) => {
    
    if(data.almacen === productoSeleccionado.almacen[0]._id){
      alert("Debe seleccionar un almacen diferente al origen");
      setCantidadTrasladar(0);
      reset({
        almacen: "",
      })
      return;
    }
    let categoriasIDs = [];
    productoSeleccionado.categoria.map((current,index)=>{
      categoriasIDs.push(current._id);
    })
    let proveedorID = productoSeleccionado.proveedor._id;
    
    startTrasladarProducto(productoSeleccionado._id,productoSeleccionado.nombre,cantidadTrasladar,productoSeleccionado.stock,productoSeleccionado.presentacion,data.almacen, proveedorID, categoriasIDs);

    //resets
    setCantidadTrasladar(0);
    reset({
      almacen: "",
    })
    setOpenEditDialog(false);
    setOpenAlert(true);
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
          />
        </Grid>
      </Grid>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>
          Trasladar Producto
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseEditDialog}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Producto"
            fullWidth
            variant="outlined"
            disabled={true}
            defaultValue={productoSeleccionado.nombre}
          />
          <TextField
            margin="dense"
            label="Talla/Presentacion"
            fullWidth
            disabled={true}
            variant="outlined"
            defaultValue={productoSeleccionado.presentacion}
          />
          <FormHelperText>
            Origen
          </FormHelperText>
          <TextField
            margin="dense"
            label="Almacen"
            fullWidth
            disabled={true}
            variant="outlined"
            defaultValue={productoSeleccionado.almacen[0].name}
          />
          <TextField 
            type='number'
            margin="dense"
            label="Stock"
            fullWidth
            variant="outlined"
            disabled={true}
            value={productoSeleccionado.stock} 
          />
          <TextField 
            type='number'
            margin="dense"
            label="Cantidad"
            fullWidth
            variant="outlined"
            value={cantidadTrasladar}
            onChange={onChangeCantidad}/>

          <FormHelperText sx={{mb:1}}>
            Destino 
          </FormHelperText>
          <Controller
              name="almacen"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El almacen es obligatorio.",
                },
              }}
              render={({ field }) => (
                
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="almacen-label">
                    Almacen
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="almacen-label"
                    id="almacen-select"
                    label="Almacen"
                    error={!!errors.almacen}
                  >
                    {almacenes.map((almacen) => (
                      <MenuItem key={almacen._id} value={almacen._id} >
                        {almacen.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          <FormHelperText>
            Si en el Almacen Destino el producto no existe, éste será creado e iniciado con la cantidad trasladada. Si por el contrario el producto existe, la cantidad trasladada será sumada al stock de éste (Para esta funcion los productos deben tener el mismo nombre).  
          </FormHelperText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="error">
            Cancelar
          </Button>
          <Button 
            disabled={(cantidadTrasladar>0 && cantidadTrasladar<=productoSeleccionado.stock)?false :true }
            onClick={handleSubmit(handleSaveEditDialog)} 
            color="success">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Material Alert */}
      <AlertSnackbar open={openAlert} onClose={handleCloseAlert} message="Acción realizada exitosamente"/>
    
    </>
  );
};