import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Close, PersonAdd } from "@mui/icons-material";
import { CustomBreadcrumbs, ButtonLink, TablePaginationActions, SearchBar, AlertSnackbar, DeleteConfirmDialog, CustomTableV2 } from "../../../components";
import { useProveedoresStore } from "../../../../../hooks";

export const AdminProveedores = () => {

  // Estado para la búsqueda de usuarios
  const [search, setSearch] = React.useState("");
  // Estados para la paginación de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {proveedores, 
    startCreateProveedor, 
    startReadProveedores, 
    startUpdateProveedor, 
    startDeleteProveedor} = useProveedoresStore();

  useEffect(()=>{
    startReadProveedores();
  },[])

  const columns = [
    { id: "_id", label: "ID", align: "left" },
    { id: "nombre", label: "Nombre", align: "center" },
    { id: "contacto", label: "Contacto", align: "center" },
    { id: "acciones", label: "Acciones", align: "center" },
  ];
  const rows = proveedores;
  
  {/* evento de editar cierto proveedor */}
  const handleUpdateClick = (event) => {
    const proveedorSample = {
      "_id"      : "0ca6e94dfc0b89a4e227",
      "nombre"   : "el popo",
      "contacto" : "31245648584"
    }
    if(event.target.id!==""){

      
      startUpdateProveedor(event.target.id,proveedorSample);
    }
    else{
      startUpdateProveedor(event.target.farthestViewportElement.id,proveedorSample);
    }
  };   
  
  {/* evento de eliminar cierto proveedor */}
  const handleDeleteClick = (event) => {

    if(event.target.id!==""){
      startDeleteProveedor(event.target.id);
    }
    else{
      startDeleteProveedor(event.target.farthestViewportElement.id);
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

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editProvider, setEditProvider] = useState(null);

  const handleOpenEditDialog = (provider) => {
    setEditProvider(provider);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [providerToDelete, setProviderToDelete] = useState(null);

  const handleOpenConfirmDialog = (provider) => {
    setProviderToDelete(provider);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmDelete = () => {
    console.log("Proveedor eliminado:", providerToDelete);
    setOpenConfirmDialog(false);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  
  return (
    <>
      <Grid container justifyContent="center" alignItems="center" sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
          <CustomBreadcrumbs pathList={[
            { name: "Inventario", route: "/inventario"},
            { name: "Proveedores" },
          ]} />
        </Paper>
      </Grid>
      
      <Grid container direction="column">
        <Grid container direction="row" justifyContent="space-between">
          <Grid direction="column">
            <Typography variant="h4" display="inline">
              Proveedores
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
                onClick={startCreateProveedor}
              >
                Crear proveedor
              </Button> */}
              <ButtonLink
                to="/proveedores/crear"
                variant="contained"
                color="success"
                size="medium"
                sx={{ backgroundColor: "black", color: "white", marginRight: 2 }}
                startIcon={<PersonAdd sx={{ color: "white" }} />}
              >
                Crear Proveedor
              </ButtonLink>
            </Grid>
          </Grid>
          
          <SearchBar search={search} setSearch={setSearch} />
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
          Editar Proveedor
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseEditDialog}
            aria-label="close"
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close/>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            variant="outlined"
            defaultValue={editProvider && editProvider.nombre}
          />
          <TextField
            margin="dense"
            label="Contacto"
            fullWidth
            variant="outlined"
            defaultValue={editProvider && editProvider.contacto}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="error">
            Cancelar
          </Button>
          <Button onClick={handleCloseEditDialog} color="success">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteConfirmDialog open={openConfirmDialog} onClose={handleCloseConfirmDialog} onConfirm={handleConfirmDelete}
        title="¿Estás seguro de que deseas eliminar este proveedor?"
      />

      <AlertSnackbar open={openAlert} onClose={handleCloseAlert} message="Acción realizada exitosamente" />
    </>
  );
};
  



