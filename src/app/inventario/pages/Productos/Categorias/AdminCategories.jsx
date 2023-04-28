import React, { useState } from "react";
import { Button, Divider, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Close, BookmarkAdd} from "@mui/icons-material";
import { CustomBreadcrumbs, ButtonLink, TablePaginationActions, EditButton, DeleteButton, CustomTable, SearchBar, AlertSnackbar, DeleteConfirmDialog } from "../../../components/index.js";
import { headerCellStyle } from "../../../util/utils";

export const AdminCategories = () => {

  const createData = (id, nombre, descripcion) => {
    return { id, nombre, descripcion };
  };

  const rows = [
    createData("01", "Categoría 1", "Descripción 1"),
    createData("02", "Categoría 2", "Descripción 2"),
    createData("03", "Categoría 3", "Descripción 3"),
    // ... Agrega más categorías aquí
  ];
  
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((category) =>
    category.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleOpenEditDialog = (category) => {
    setEditCategory(category);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleOpenConfirmDialog = (category) => {
    setCategoryToDelete(category);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmDelete = () => {
    console.log("Categoría eliminada:", categoryToDelete);
    setOpenConfirmDialog(false);
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const columns = [
    { id: "id", label: "ID", align: "left", style: headerCellStyle },
    { id: "nombre", label: "Nombre", align: "center", style: headerCellStyle },
    { id: "descripcion", label: "Descripción", align: "center", style: headerCellStyle },
    { id: "actions", label: "Acciones", align: "center", style: headerCellStyle },
  ];

  const actions = (category) => (
    <>
      <EditButton item={category} onClick={handleOpenEditDialog} />
      <DeleteButton item={category} onClick={handleOpenConfirmDialog} />
    </>
  );

  const pathList = [
    { name: "Inventario", to: "/inventario" },
    { name: "Categorías", to: "/inventario/categorias" },
  ];

    
  return (
    <>
      <Grid container justifyContent="center" alignItems="center" sx={{ mb: 3, width: "100%" }}>
          <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
            <CustomBreadcrumbs pathList={pathList} />
          </Paper>
        </Grid>
        <Grid container direction="column">
          <Grid container direction="row" justifyContent="space-between">
            <Grid direction="column">
              <Typography variant="h4" display="inline">
                Categorías
              </Typography>
              <Typography variant="subtitle1" display="inline" sx={{ ml: 0.9 }}>
                {`${rows.length} total`}
              </Typography>
              <Grid container sx={{ mt: 2 }} direction="column">
                <ButtonLink
                  to="/categorias/crear"
                  variant="contained"
                  color="success"
                  size="medium"
                  sx={{ backgroundColor: "black", color: "white", marginRight: 2 }}
                  startIcon={<BookmarkAdd sx={{ color: "white" }} />}
                >
                  Crear Categoría
                </ButtonLink>
              </Grid>
            </Grid>
            <SearchBar search={search} setSearch={setSearch} />
          </Grid>
          <Divider sx={{ mt: 2 }} />
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
    
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>
            Editar Categoría
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
              defaultValue={editCategory && editCategory.nombre}
            />
            <TextField
              margin="dense"
              label="Contacto"
              fullWidth
              variant="outlined"
              defaultValue={editCategory && editCategory.descripcion}
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
        <DeleteConfirmDialog
          open={openConfirmDialog}
          onClose={handleCloseConfirmDialog}
          onConfirm={handleConfirmDelete}
          title="¿Estás seguro de que deseas eliminar esta categoría?"
        />
        <AlertSnackbar
          open={openAlert}
          onClose={handleCloseAlert}
          message="Acción realizada exitosamente"
        />
      </>
    );
  };