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
        categoriaSeleccionada,
        startReadCategorias,
        startBuscarCategoria,
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
    
    if(event.target.id!==""){

      startBuscarCategoria(event.target.id);
      handleOpenEditDialog();
    }
    else{

      startBuscarCategoria(event.target.farthestViewportElement.id);
      handleOpenEditDialog();
    }
  };   

  {/* evento de eliminar cierta categoria */}
  const handleDeleteClick = (event) => {

    if(event.target.id!==""){
      startBuscarCategoria(event.target.id);
      handleOpenConfirmDialog();
    }
    else{
      startBuscarCategoria(event.target.farthestViewportElement.id);
      handleOpenConfirmDialog();
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

  //alert confirmation
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  //UPDATE HANDLES AND STATES
  const [openEditDialog, setOpenEditDialog] = useState(false);

  //abrir dialog editar
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };
  //cerrar dialog editar
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveEditDialog = () => {
    setOpenEditDialog(false);
    const categoriaSample = {
      "_id"    : categoriaSeleccionada._id,
      "name" : document.getElementById("categoria-name-update").value,
      "description": document.getElementById("categoria-description-update").value
    }

    startUpdateCategoria(categoriaSeleccionada._id,categoriaSample);
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

  //handle confirmar eliminar categoria
  const handleConfirmDelete = () => {
    startDeleteCategoria(categoriaSeleccionada._id);
    setOpenConfirmDialog(false);
    setOpenAlert(true);
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
            id="categoria-name-update"
            defaultValue={categoriaSeleccionada.name}
          />
          <TextField
            margin="dense"
            label="Descripción"
            fullWidth
            variant="outlined"
            id="categoria-description-update"
            defaultValue={categoriaSeleccionada.description}
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
      <DeleteConfirmDialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmDelete}
        title={`¿Estás seguro de que deseas eliminar la categoría "${categoriaSeleccionada.name}"?`}
      />
      <AlertSnackbar
        open={openAlert}
        onClose={handleCloseAlert}
        message="Acción realizada exitosamente"
      />
    </>
    );
  };