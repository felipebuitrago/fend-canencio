import React, { useEffect, useState } from "react";
import { Button, Divider, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Close, PersonAdd } from "@mui/icons-material";
import { CustomBreadcrumbs, ButtonLink, TablePaginationActions, SearchBar, AlertSnackbar, DeleteConfirmDialog, CustomTableV2 } from "../../../components";
import { usePacientesStore } from "../../../../../hooks";

export const AdminPacientes = () => {

  // Estado para la búsqueda de usuarios
  const [search, setSearch] = React.useState("");
  // Estados para la paginación de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const {pacientes, 
    startCreatePaciente, 
    startReadPacientes, 
    startUpdatePaciente, 
    startDeletePaciente} = usePacientesStore();

  useEffect(()=>{
    startReadPacientes();
  },[])

  const columns = [
    { id: "_id", label: "ID", align: "left"},
    { id: "name", label: "Nombre", align: "center"},
    { id: "contact", label: "Contacto", align: "center"},
    { id: "acciones", label: "Acciones", align: "center"},
  ];
  const rows = pacientes;

  {/* evento de editar cierto paciente */}
  const handleUpdateClick = (event) => {
    const pacienteSample = {
      "_id"    : "50ec999c5bb44822945",
      "name" : "soto",
      "contact": "inferno"
    }
    if(event.target.id!==""){

      
      startUpdatePaciente(event.target.id,pacienteSample);
    }
    else{
      startUpdatePaciente(event.target.farthestViewportElement.id,pacienteSample);
    }
  };   

  {/* evento de eliminar cierto paciente */}
  const handleDeleteClick = (event) => {

    if(event.target.id!==""){
      startDeletePaciente(event.target.id);
    }
    else{
      startDeletePaciente(event.target.farthestViewportElement.id);
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

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editPatient, setEditPatient] = useState(null);

  const handleOpenEditDialog = (patient) => {
    setEditPatient(patient);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

  const handleOpenConfirmDialog = (patient) => {
    setPatientToDelete(patient);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmDelete = () => {
    console.log("Paciente eliminado:", patientToDelete);
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
          { name: "Pacientes" },
          ]} />
        </Paper>
      </Grid>
      <Grid container direction="column">
        <Grid container direction="row" justifyContent="space-between">
          <Grid direction="column">
            <Typography variant="h4" display="inline">
              Pacientes
            </Typography>
            <Typography variant="subtitle1" display="inline" sx={{ ml: 0.9 }}>
              {`${rows.length} total`}
            </Typography>
            <Grid container sx={{ mt: 2 }} direction="column">
              <ButtonLink
                to="/pacientes/crear"
                variant="contained"
                color="success"
                size="medium"
                sx={{ backgroundColor: "black", color: "white", marginRight: 2 }}
                startIcon={<PersonAdd sx={{ color: "white" }} />}
              >
                Crear Paciente
              </ButtonLink>
            </Grid>
          </Grid>

          <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
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
          Editar Paciente
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
            defaultValue={editPatient && editPatient.nombre}
          />
          <TextField
            margin="dense"
            label="Contacto"
            fullWidth
            variant="outlined"
            defaultValue={editPatient && editPatient.contacto}
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
        title="¿Estás seguro de que deseas eliminar este paciente?"
      />
      <AlertSnackbar
        open={openAlert}
        onClose={handleCloseAlert}
        message="Acción realizada exitosamente"
      />
    </>
  );
};