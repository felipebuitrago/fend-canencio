import React, { useState, useCallback, useEffect } from "react";
import { Button,Checkbox , Divider, FormControlLabel, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Close, PersonAdd } from "@mui/icons-material";
import { CustomBreadcrumbs, ButtonLink, TablePaginationActions, SearchBar, AlertSnackbar, DeleteConfirmDialog, CustomTableV2 } from "../../components/index.js";
import { useUsuariosStore } from "../../../../hooks";

// Componente principal de la página de administración de usuarios
export const AdminUsers = () => {

  // Estado para la búsqueda de usuarios
  const [search, setSearch] = React.useState("");
  // Estados para la paginación de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //contraseña editar
  const [editPassword, setEditPassword] = useState(false);
  const [password, setPassword] = useState("");
  const handleCheckboxChange = (event) => {
    setEditPassword(event.target.checked);
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const {usuarios, 
    usuarioSeleccionado,
    startReadUsuarios, 
    startBuscarUsuario,
    startUpdateUsuario, 
    startDeleteUsuario} = useUsuariosStore();
    
  useEffect(()=>{
    startReadUsuarios();
  },[])

  // Columnas de la tabla
  const columns = [
    { id: "id", label: "ID", align: "left"},
    { id: "name", label: "Nombre", align: "center"},
    { id: "email", label: "Correo", align: "center"},
    { id: "rol", label: "Rol", align: "center"},
    { id: "acciones", label: "Acciones", align: "center"},
  ];
  const rows = usuarios;
  
  {/* evento de editar cierto usuario */}
  const handleUpdateClick = (event) => {
    
    if(event.target.id!==""){

      startBuscarUsuario(event.target.id);
      handleOpenEditDialog();
    }
    else{
      startBuscarUsuario(event.target.farthestViewportElement.id);
      handleOpenEditDialog();
    }
  };   
  
  {/* evento de eliminar cierto usuario */}
  const handleDeleteClick = (event) => {

    if(event.target.id!==""){
      startBuscarUsuario(event.target.id);
      handleOpenConfirmDialog();
    }
    else{
      startBuscarUsuario(event.target.farthestViewportElement.id);
      handleOpenConfirmDialog();
    }
  };   
  
  // Filtra las filas de la tabla según la búsqueda por nombre
  const filteredRows = rows.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
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
                                        
  // Abre el modal de edición
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };
  // Cierra el modal de edición
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setPassword("");
    setEditPassword(false);
  };

  const handleSaveEditDialog = () => {
    setOpenEditDialog(false);
    
    if(editPassword && password.length >= 6){

      const userSample = {
      "_id" : usuarioSeleccionado._id,
      "name" : document.getElementById("usuario-name-update").value,
      "email" : document.getElementById("usuario-email-update").value,
      "password" : password
      }
      startUpdateUsuario(usuarioSeleccionado._id,userSample);
      setOpenAlert(true);
    }else{
      const userSample = {
        "_id" : usuarioSeleccionado._id,
        "name" : document.getElementById("usuario-name-update").value,
        "email" : document.getElementById("usuario-email-update").value
        }
        startUpdateUsuario(usuarioSeleccionado._id,userSample);
        setOpenAlert(true);
    }
    setPassword("");
    setEditPassword(false);
  };

  //ELIMINAR HANDLES AND STATES
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  
  // Abre el modal de confirmación
  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };
  // Cierra el modal de confirmación
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  
  // Confirma la eliminación del usuario
  const handleConfirmDelete = () => {
    startDeleteUsuario(usuarioSeleccionado._id);
    setOpenConfirmDialog(false);
    setOpenAlert(true);
  };
  
  return (
    <>
      <Grid container justifyContent="center" alignItems="center"sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
            <CustomBreadcrumbs pathList={[
              { name: "Inventario", route: "/inventario"},
              { name: "Usuarios" },
            ]} />
        </Paper>
      </Grid>
      {/* main grid */}
      <Grid container direction="column">
        {/* barra superior, btn crear y busqueda */}
        <Grid container direction="row" justifyContent="space-between">
          {/* L. Titulo Pagina y btn crear */}
          <Grid direction="column">
            <Typography variant="h4" display="inline">
              Usuarios
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
              onClick={startCreateUsuario}
            >
              Crear producto
            </Button> */}
            <ButtonLink
              to="/usuarios/crear"
              variant="contained"
              color="success"
              size="medium"
              sx={{ backgroundColor: "black", color: "white", marginRight: 2 }}
              startIcon={<PersonAdd sx={{ color: "white" }} />}
            >
              Crear Usuario
            </ButtonLink>
            </Grid>
          </Grid>

          {/* componentes de barra de busqueda */}
          <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
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
      
      {/* modal editar */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>
          Editar Usuario
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
            id="usuario-name-update"
            defaultValue={usuarioSeleccionado.name}
          />
          <TextField
            margin="dense"
            label="Correo"
            fullWidth
            variant="outlined"
            id="usuario-email-update"
            defaultValue={usuarioSeleccionado.email}
          />
        <FormControlLabel
          control={
            <Checkbox
              checked={editPassword}
              onChange={handleCheckboxChange}
            />
          }
          label="Editar Contraseña"
        />
        <TextField
          margin="dense"
          label="Clave"
          fullWidth
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          disabled={!editPassword}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="error">
            Cancelar
          </Button>
          <Button disabled={editPassword && password.length<6 } onClick={handleSaveEditDialog} color="success">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
      {/* modal eliminar */}
      <DeleteConfirmDialog 
        open={openConfirmDialog} 
        onClose={handleCloseConfirmDialog} 
        onConfirm={handleConfirmDelete}
        title={`¿Estás seguro de que deseas eliminar a ${usuarioSeleccionado.name}?`}
      />
      {/* Material Alert */}
      <AlertSnackbar 
        open={openAlert} 
        onClose={handleCloseAlert} 
        message="Acción realizada exitosamente"/>
    </>
  );
};