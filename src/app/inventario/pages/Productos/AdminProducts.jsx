import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Category, Close, LibraryAddOutlined } from '@mui/icons-material';

import { useCategoriasStore, useProductosStore } from '../../../../hooks'
import { SearchBar, TablePaginationActions, CustomTableV2, CustomBreadcrumbs, ButtonLink, AlertSnackbar, DeleteConfirmDialog, MultipleSelectChip } from '../../components';
import { Controller, useForm } from 'react-hook-form';

export const AdminProducts = () => {

  // Estado para la búsqueda de usuarios
  const [search, setSearch] = useState("");
  // Estados para la paginación de la tabla
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
  const {productos, 
    productoSeleccionado,
    startReadProductos, 
    startBuscarProducto,
    startUpdateProducto, 
    startDeleteProducto} = useProductosStore();
  
  const {categorias, startReadCategorias} = useCategoriasStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm({
    defaultValues: {
      categoria: [],
    },
  });
    
  useEffect(()=>{
    startReadProductos();
    startReadCategorias();
  },[])

  const columns = [
    { id: "id", label: "ID", align: "left"},
    { id: "nombre", label: "Nombre", align: "center"},
    { id: "presentacion", label: "Presentación/Talla", align: "center"},
    { id: "proveedor", label: "Proveedor", align: "center"},
    { id: "categoria", label: "Categorías", align: "center"},
    { id: "almacen", label: "Almacen", align: "center"},
    { id: "stock", label: "Stock", align: "center"},
    { id: "acciones", label: "Acciones", align: "center"},
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
  
  {/* evento de eliminar cierto producto */}
  const handleDeleteClick = (event) => {

    if(event.target.id!==""){
      startBuscarProducto(event.target.id);
      handleOpenConfirmDialog();

    }
    else{
      startBuscarProducto(event.target.farthestViewportElement.id);
      handleOpenConfirmDialog();
    }
  };   
  
  // Filtra las filas de la tabla según la búsqueda por nombre
  const filteredRows = rows.filter((user) =>
    user.nombre.toLowerCase().includes(search.toLowerCase())
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
    
  //alert confirmation
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  //UPDATE HANDLES AND STATES
  const [openEditDialog, setOpenEditDialog] = useState(false);
  //categoria editar
  const [editCategory, setEditCategory] = useState(false);
  const handleCheckboxChange = (event) => {
    setEditCategory(event.target.checked);
  };

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditCategory(false);
    reset({
      categoria: [],
    })
  };

  const handleSaveEditDialog = () => {
    setOpenEditDialog(false);
    if(editCategory){

      const productSample = {
        "_id": productoSeleccionado._id,
        "nombre": document.getElementById("producto-nombre-update").value,
        "presentacion": document.getElementById("producto-presentacion-update").value,
        "categoria": getValues("categoria")
      }
      startUpdateProducto(productoSeleccionado._id,productSample);  
    
    }else{
      const productSample = {
        "_id": productoSeleccionado._id,
        "nombre": document.getElementById("producto-nombre-update").value,
        "presentacion": document.getElementById("producto-presentacion-update").value,
      }
      startUpdateProducto(productoSeleccionado._id,productSample);  
    }
    reset({
      categoria: [],
    })
    setEditCategory(false);
    setOpenAlert(true);
  };

  //ELIMINAR HANDLES AND STATES
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  //abrir dialog confirmar borrar
  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  //cerrar dialog confirmar borrar
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  //handle confirmar eliminar producto
  const handleConfirmDelete = () => {
    startDeleteProducto(productoSeleccionado._id);
    setOpenConfirmDialog(false);
    setOpenAlert(true);
  };



  return (
    <>
      {/* CustomBreadcrumbs */}
      <Grid container justifyContent="center" alignItems="center"sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
            <CustomBreadcrumbs pathList={[
              { name: "Inventario", route: "/inventario"},
              { name: "Productos" },]} 
            />
        </Paper>
      </Grid>
      {/* main grid */}
      <Grid container direction="column">
        {/* barra superior, btn crear y busqueda */}
        <Grid container direction="row" justifyContent="space-between">
          {/* L. Titulo Pagina y btn crear */}
          <Grid direction="column">
            <Typography variant="h4" display="inline">Productos</Typography>
            <Typography variant="subtitle1" display="inline" sx={{ ml: 0.9 }}>
              {`${rows.length} total`}
            </Typography> 
            <Grid container sx={{ mt: 2 }} direction="column">
              {/* <Button
                variant="contained"
                fullWidth
                color="success"
                size="large"
                sx={{ backgroundColor: "black", color: "white", mt: 3 }}
                onClick={startCreateProducto}
              >
                Crear producto
              </Button> */}
              <ButtonLink
              to="/productos/crear"
              variant="contained"
              color="success"
              size="medium"
              sx={{ backgroundColor: "black", color: "white", marginRight: 2 }}
              startIcon={<LibraryAddOutlined sx={{ color: "white" }} />}
              >
                Crear Producto
              </ButtonLink>
            </Grid>
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
          <>
          {/* <TableContainer component="div">
            <Table aria-label="simple table">
              <TableHead sx={{ background: "black" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      color: "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                    }}
                    align="center"
                  >
                    Nombre
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                    }}
                    align="center"
                  >
                    Presentación/Talla
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                    }}
                    align="center"
                  >
                    Proveedor
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                    }}
                    align="center"
                  >
                    Categoría
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                    }}
                    align="center"
                  >
                    Almacen
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                    }}
                    align="center"
                  >
                    Stock
                  </TableCell>
                  <TableCell
                    sx={{
                      color: "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                    }}
                    align="center"
                  >
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((row,index) => 
                  <TableRow key={row._id}>
                    <TableCell>{(index<9)?"product0".concat(index+1):"product".concat(index+1)}</TableCell>
                    <TableCell align="center">{row.nombre}</TableCell>
                    <TableCell align="center">{row.presentacion}</TableCell>
                    <TableCell align="center">{row.proveedor.nombre}</TableCell>
                    
                    <TableCell align="center">
                      {(row.categoria.length>0)?(
                        row.categoria.map(categoria => <span>{categoria.name}</span>)
                        ):<span>no categoria</span>}
                    </TableCell>

                    <TableCell align="center">
                    {(row.almacen.length>0)?(
                      row.almacen.map(almacen =><span>{almacen.name} <br/> </span>)
                    ):<span>no almacen</span>}
                    </TableCell>
                    
                    <TableCell align="center">{row.stock}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="contained"
                        color="info"
                        sx={{ transform: "scale(0.9)" }}
                        id={row._id}
                        onClick={handleUpdateClick}
                      >
                        <EditOutlined id={row._id}/>
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        sx={{ transform: "scale(0.9)" }}
                        id={row._id}
                        onClick={handleDeleteClick}
                        ch
                      >
                        <DeleteForeverOutlined id={row._id}/>
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>  */}
          </>
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
        {/* fin tabla display data */}
      </Grid>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>
          Editar Producto
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
            label="Nombre"
            fullWidth
            variant="outlined"
            id="producto-nombre-update"
            defaultValue={productoSeleccionado.nombre}
          />
          <TextField
            margin="dense"
            label="Talla/Presentacion"
            fullWidth
            variant="outlined"
            id="producto-presentacion-update"
            defaultValue={productoSeleccionado.presentacion}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={editCategory}
                onChange={handleCheckboxChange}
              />
            }
            label="Editar Categoria"
          />
          <Controller
            name="categoria"
            control={control}
            
            rules={{
              required: {
                value: editCategory,
                message: "La categoría es obligatoria.",
              },
            }}
            render={({ field }) => (
              <MultipleSelectChip
                label="Categoría"
                items={categorias}
                value={field.value}
                onChange={field.onChange}
                error={!!errors.categoria}
                active={!editCategory}
                icon={<Category id="icon-black"/>}
              />
            )}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="error">
            Cancelar
          </Button>
          <Button onClick={handleSubmit(handleSaveEditDialog)} color="success">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteConfirmDialog open={openConfirmDialog} onClose={handleCloseConfirmDialog} onConfirm={handleConfirmDelete}
       title={`¿Estás seguro de que deseas eliminar el almacén "${productoSeleccionado.nombre}"?`}
      />
      {/* Material Alert */}
      <AlertSnackbar open={openAlert} onClose={handleCloseAlert} message="Acción realizada exitosamente"/>
    
    </>
  );
}
