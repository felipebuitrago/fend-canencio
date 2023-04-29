import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Close, BookmarkAdd} from "@mui/icons-material";

import { CustomBreadcrumbs, ButtonLink, TablePaginationActions, SearchBar, AlertSnackbar, DeleteConfirmDialog, CustomTableV2 } from "../../../components";
import { useCategoriasStore } from "../../../../../hooks";

export const AdminCategories = () => {

  // Estado para la búsqueda de usuarios
  const [search, setSearch] = React.useState("");
  // Estados para la paginación de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {categorias,
        startCreateCategoria,
        startReadCategorias,
        startUpdateCategoria,
        startDeleteCategoria} = useCategoriasStore();

  useEffect(()=>{
    startReadCategorias();
  },[])

  const columns = [
    { id: "id", label: "ID", align: "left" },
    { id: "name", label: "Nombre", align: "center" },
    { id: "description", label: "Descripción", align: "center" },
    { id: "acciones", label: "Acciones", align: "center" },
  ];
  const rows = categorias;

  {/* evento de editar cierta categoria */}
  const handleUpdateClick = (event) => {
    const categoriaSample = {
      "_id"    : "50ec999c5bb44822945",
      "name" : "Crononicaca",
      "description": "la mera caca"
    }
    if(event.target.id!==""){

      
      startUpdateCategoria(event.target.id,categoriaSample);
    }
    else{
      startUpdateCategoria(event.target.farthestViewportElement.id,categoriaSample);
    }
  };   

  {/* evento de eliminar cierta categoria */}
  const handleDeleteClick = (event) => {

    if(event.target.id!==""){
      startDeleteCategoria(event.target.id);
    }
    else{
      startDeleteCategoria(event.target.farthestViewportElement.id);
    }
  };   

  // Filtra las filas de la tabla según la búsqueda por nombre
  const filteredRows = rows.filter((categoria) =>
    categoria.name.toLowerCase().includes(search.toLowerCase())
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

    
  return (
    <>
      <Grid container justifyContent="center" alignItems="center" sx={{ mb: 3, width: "100%" }}>
          <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
            <CustomBreadcrumbs pathList={[
              { name: "Inventario", route: "/inventario" },
              { name: "Categorías"},
            ]} />
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
                {/* <Button
                variant="contained"
                fullWidth
                color="success"
                size="large"
                sx={{ backgroundColor: "black", color: "white", mt: 3 }}
                onClick={startCreateCategoria}
                >
                  Crear categoria
                </Button> */}
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