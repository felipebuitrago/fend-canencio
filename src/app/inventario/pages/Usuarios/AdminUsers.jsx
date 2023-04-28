import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Button, Divider, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Close, PersonAdd } from "@mui/icons-material";
import { CustomBreadcrumbs, ButtonLink, TablePaginationActions, EditButton, DeleteButton, CustomTable, SearchBar, AlertSnackbar, DeleteConfirmDialog } from "../../components/index.js";
import { headerCellStyle } from "../../util/utils";
// Componente principal de la página de administración de usuarios
export const AdminUsers = () => {
 
  // Estado local para el filtro de usuarios
  const [value, setValue] = React.useState("Todos");
  const dataUsuarios = useSelector((state) => state.usuarios);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const createData = (id, nombre, correo, rol) => {
    return { id, nombre, correo, rol };
  };

  const rows = [
    createData("01", "Juan Pérez", "juan@gmail.com", "Admin"),
    createData("02", "María García", "maria@gmail.com", "Usuario"),
    createData("03", "Luis Gómez", "luis@gmail.com", "Usuario"),
    createData("04", "Ana Rodríguez", "ana@gmail.com", "Admin"),
    createData("05", "Diana Martines", "dani@gmail.com", "Usuario"),
    createData("06", "Jose Cordoba", "josec@gmail.com", "Usuario"),
    createData("07", "Felipe Buitrago", "ana@gmail.com", "Admin"),
    createData("08", "Karen Perdomo", "karenp@gmail.com", "Usuario"),
    createData("09", "Camilo Martines", "camilo@gmail.com", "Usuario"),
    createData("10", "Angela Martines", "angela@gmail.com", "Usuario"),
    createData("11", "Julian Martines", "julian@gmail.com", "Usuario"),
  ];
  // Estado para la búsqueda de usuarios
  const [search, setSearch] = React.useState("");
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  // Estados para la paginación de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Filtra las filas de la tabla según la búsqueda por nombre
  const filteredRows = rows.filter((user) =>
    user.nombre.toLowerCase().includes(search.toLowerCase())
  );
  // Calcula el número de filas vacías para rellenar la tabla
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);
  // Añade  estados para el modal de edición y el alert
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  // Abre el modal de edición
  const handleOpenEditDialog = (user) => {
    setEditUser(user);
    setOpenEditDialog(true);
  };
  // Cierra el modal de edición
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  // Añade los nuevos estados para el modal de confirmación y el alert
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  // Abre el modal de confirmación
  const handleOpenConfirmDialog = (user) => {
    setUserToDelete(user);
    setOpenConfirmDialog(true);
  };
  // Cierra el modal de confirmación
  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };
  // Confirma la eliminación del usuario
  const handleConfirmDelete = () => {
    // Aquí puedes realizar la acción de eliminar el usuario
    console.log("Usuario eliminado:", userToDelete);
    setOpenConfirmDialog(false);
    setOpenAlert(true);
  };
  // Cierra el alert
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };
  // Columnas de la tabla
  const columns = [
    { id: "id", label: "ID", align: "left", style: headerCellStyle },
    { id: "nombre", label: "Nombre", align: "center", style: headerCellStyle },
    { id: "correo", label: "Correo", align: "center", style: headerCellStyle },
    { id: "rol", label: "Rol", align: "center", style: headerCellStyle },
    { id: "actions", label: "Acciones", align: "center", style: headerCellStyle,},
  ];
  // Acciones (botones) de la tabla
  const actions = (user) => (
    <>
      <EditButton item={user} onClick={handleOpenEditDialog} />
      <DeleteButton item={user} onClick={handleOpenConfirmDialog} />
    </>
  );
  const pathList = [
    { name: "Inventario", route: "/inventario"},
    { name: "Usuarios" },
  ];
  return (
    <>
      <Grid container justifyContent="center" alignItems="center"sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
            <CustomBreadcrumbs pathList={pathList} />
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
          <SearchBar search={search} setSearch={setSearch} />
        </Grid>
        {/* fin barra superior */}
        <Divider sx={{ mt: 2 }} />
        {/* tabla display data */}
        <Grid container direction="column" sx={{ mt: 2 }}>
          <CustomTable
            columns={columns}
            rows={rows}
            actions={actions}
            filteredRows={filteredRows}
            page={page}
            rowsPerPage={rowsPerPage}
            emptyRows={emptyRows}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            TablePaginationActions={TablePaginationActions}
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
            defaultValue={editUser && editUser.nombre}
          />
          <TextField
            margin="dense"
            label="Correo"
            fullWidth
            variant="outlined"
            defaultValue={editUser && editUser.correo}
          />
          <TextField
            margin="dense"
            label="Clave"
            fullWidth
            variant="outlined"
            type="password"
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
      {/* modal eliminar */}
      <DeleteConfirmDialog open={openConfirmDialog} onClose={handleCloseConfirmDialog} onConfirm={handleConfirmDelete}
       title="¿Estás seguro de que deseas eliminar este usuario?"
      />
      {/* Material Alert */}
      <AlertSnackbar open={openAlert} onClose={handleCloseAlert} message="Acción realizada exitosamente"/>
    </>
  );
};