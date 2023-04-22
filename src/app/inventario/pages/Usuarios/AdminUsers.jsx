import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, TablePagination, Dialog, DialogTitle, DialogContent, DialogActions,IconButton, Alert, Snackbar } from "@mui/material";
import { Search, EditOutlined, DeleteForeverOutlined, Close as CloseIcon } from "@mui/icons-material";
import CustomBreadcrumbs from "../../components/CustomBreadcrumbs.jsx";
import TablePaginationActions from "../../components/TablePagination.jsx";

export const AdminUsers = () => {
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
  // Añade el estado para el modal de edición
  const [search, setSearch] = React.useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((user) =>
    user.nombre.toLowerCase().includes(search.toLowerCase())
  );
  
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);
   // Añade el estado para el modal de confirmación
  const headerCellStyle = {
    backgroundColor: "black",
    color: "white",
    borderRightColor: "white",
    borderRightWidth: 1,
    borderRightStyle: "solid",
  };
  // Añade los nuevos estados para el modal de edición y el alert
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleOpenEditDialog = (user) => {
    setEditUser(user);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  // Añade los nuevos estados para el modal de confirmación y el alert
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleOpenConfirmDialog = (user) => {
    setUserToDelete(user);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmDelete = () => {
    // Aquí puedes realizar la acción de eliminar el usuario
    console.log("Usuario eliminado:", userToDelete);

    setOpenConfirmDialog(false);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <>
          <Grid container justifyContent="center" alignItems="center" sx={{ mb: 3, width: '100%' }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: '100%' }}>
          <CustomBreadcrumbs currentPage="Usuarios" />
        </Paper>
      </Grid>
      {/* main grid */}
      <Grid container direction="column">
          {/* barra superior, btn crear y busqueda */}
    <Grid container direction="row" justifyContent="space-between">
      {/* L. Titulo Pagina y btn crear */}
      <Grid direction="column">
        <Typography variant="h4" display="inline">Usuarios</Typography>
        <Typography variant="subtitle1" display="inline" sx={{ ml: 0.9 }}>
          {`${rows.length} total`}
        </Typography>

        <Grid container sx={{ mt: 2 }} direction="column">
          <Button
            variant="contained"
            color="success"
            size="medium"
            sx={{ backgroundColor: "black", color: "white" }}
          >
            Crear usuario
          </Button>
        </Grid>
      </Grid>
      {/* componentes de busqueda */}
      <Grid direction="column" display="flex">
        <Grid container direction="row" sx={{ mt: 3 }}>
          <TextField
            label="Buscar"
            variant="outlined"
            sx={{ transform: 'scale(0.9)' }}
            value={search}
            onChange={handleSearchChange}
          ></TextField>
          <Button
            variant="contained"
            size="small"
            color="success"
            sx={{ transform: 'scale(0.8)', ml: -2 }}
          >
            <Search />
          </Button>
        </Grid>
      </Grid>
    </Grid>
    {/* fin barra superior */}
    <Divider sx={{ mt: 2 }} />
    {/* tabla display data */}
      <Grid container direction="column">
        <TableContainer component="div">
          <Table aria-label="simple table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={headerCellStyle}>ID</TableCell>
                <TableCell sx={headerCellStyle} align="center">
                  Nombre
                </TableCell>
                <TableCell sx={headerCellStyle} align="center">
                  Correo
                </TableCell>
                <TableCell sx={headerCellStyle} align="center">
                  Rol
                </TableCell>
                <TableCell sx={headerCellStyle} align="center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredRows
              ).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell align="center">{user.nombre}</TableCell>
                  <TableCell align="center">{user.correo}</TableCell>
                  <TableCell align="center">{user.rol}</TableCell>
                  <TableCell align="center">
                    <Button
                      size="small"
                      variant="contained"
                      color="info"
                      sx={{ transform: "scale(0.9)" }} 
                      onClick={() => handleOpenEditDialog(user)}
                    >
                      <EditOutlined />
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      sx={{ transform: "scale(0.9)" }}
                      onClick={() => handleOpenConfirmDialog(user)}
                    >
                      <DeleteForeverOutlined />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && ( // si no hay filas, se rellena con filas vacias
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          labelRowsPerPage="Filas por página"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Grid>
      {/* fin tabla display data */}
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
            <CloseIcon />
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
      <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
        <DialogTitle>
          ¿Estás seguro de que deseas eliminar este usuario?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="error">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="success">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}	
      >
        <Alert onClose={handleCloseAlert} severity="success" >
          Acción realizada exitosamente
        </Alert>
      </Snackbar>
    </>             
  );  
}
