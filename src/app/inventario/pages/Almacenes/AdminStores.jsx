import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Close, AddBusiness } from "@mui/icons-material";
import { CustomBreadcrumbs, ButtonLink, TablePaginationActions, SearchBar, AlertSnackbar, DeleteConfirmDialog, CustomTableV2 } from "../../components";
import { useAlmacenesStore } from "../../../../hooks";

export const AdminStores = () => {

  // Estado para la búsqueda de usuarios
  const [search, setSearch] = React.useState("");
  // Estados para la paginación de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {almacenes, 
    almacenSeleccionado, 
    startReadAlmacenes,
    startBuscarAlmacen, 
    startUpdateAlmacen, 
    startDeleteAlmacen} = useAlmacenesStore();

  useEffect(()=>{
    startReadAlmacenes();
  },[])

  const columns = [
    { id: "id", label: "ID", align: "left"},
    { id: "name", label: "Almacén", align: "center"},
    { id: "location", label: "Ubicación", align: "center"},
    { id: "acciones", label: "Acciones", align: "center"},
  ];
  const rows = almacenes;

  {/* evento de editar cierto almacen */}
  const handleUpdateClick = (event) => {
    
    if(event.target.id!==""){

      startBuscarAlmacen(event.target.id);
      handleOpenEditDialog();
      //startUpdateAlmacen(event.target.id,almacenSample);
    }
    else{
      
      startBuscarAlmacen(event.target.farthestViewportElement.id);
      handleOpenEditDialog();
      //startUpdateAlmacen(event.target.farthestViewportElement.id,almacenSample);
    }
  };   

  {/* evento de eliminar cierto almacen */}
  const handleDeleteClick = (event) => {

    if(event.target.id!==""){
      startBuscarAlmacen(event.target.id);
      handleOpenConfirmDialog();
      //startDeleteAlmacen(event.target.id);
    }
    else{
      startBuscarAlmacen(event.target.farthestViewportElement.id);
      handleOpenConfirmDialog();
      //startDeleteAlmacen(event.target.farthestViewportElement.id);
    }
  };   

  // Filtra las filas de la tabla según la búsqueda por nombre
  const filteredRows = rows.filter((almacen) =>
    almacen.name.toLowerCase().includes(search.toLowerCase())
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

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveEditDialog = () => {
    setOpenEditDialog(false);
    const almacenSample = {
      "_id"    : almacenSeleccionado._id,
      "name" : document.getElementById("almacen-name-update").value,
      "location": document.getElementById("almacen-location-update").value
    }

    startUpdateAlmacen(almacenSeleccionado._id,almacenSample);
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

  //handle confirmar eliminar almacen
  const handleConfirmDelete = () => {
    startDeleteAlmacen(almacenSeleccionado._id);
    setOpenConfirmDialog(false);
    setOpenAlert(true);
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center" sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
          <CustomBreadcrumbs pathList={[
            { name: "Inventario", route: "/inventario" },
            { name: "Almacenes" },
          ]} />
        </Paper>
      </Grid>
      <Grid container direction="column">
        <Grid container direction="row" justifyContent="space-between">
          <Grid direction="column">
            <Typography variant="h4" display="inline">
              Almacenes
            </Typography>
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
                onClick={startCreateAlmacen}
              >
                Crear almacen
              </Button> */}
              <ButtonLink
                to="/almacenes/crear"
                variant="contained"
                color="success"
                size="medium"
                sx={{ backgroundColor: "black", color: "white", marginRight: 2 }}
                startIcon={<AddBusiness sx={{ color: "white" }} />}
              >
                Crear Almacén
              </ButtonLink>
            </Grid>
          </Grid>
          <SearchBar search={search} setSearch={setSearch} setPage={setPage}/>
        </Grid>

        <Divider sx={{ mt: 2 }} />

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


      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>
          Editar Almacén
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
            label="Almacén"
            fullWidth
            variant="outlined"
            id="almacen-name-update"
            defaultValue={almacenSeleccionado.name}
          />
          <TextField
            margin="dense"
            label="Ubicación"
            fullWidth
            variant="outlined"
            id="almacen-location-update"
            defaultValue={almacenSeleccionado.location}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="error">
            Cancelar
          </Button>
          <Button onClick={handleSaveEditDialog} color="success">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      <DeleteConfirmDialog open={openConfirmDialog} onClose={handleCloseConfirmDialog} onConfirm={handleConfirmDelete}
       title={`¿Estás seguro de que deseas eliminar el almacén "${almacenSeleccionado.name}"?`}
      />
      {/* Material Alert */}
      <AlertSnackbar open={openAlert} onClose={handleCloseAlert} message="Acción realizada exitosamente"/>
    </>
  );
};