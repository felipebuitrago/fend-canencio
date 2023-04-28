import React, { useState } from "react";
import { Button, Divider, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Close, PersonAdd } from "@mui/icons-material";
import { CustomBreadcrumbs, ButtonLink, TablePaginationActions, EditButton, DeleteButton, CustomTable, SearchBar, AlertSnackbar, DeleteConfirmDialog } from "../../../components/index.js";
import { headerCellStyle } from "../../../util/utils";

export const AdminPacientes = () => {
  const createData = (id, nombre, contacto) => {
    return { id, nombre, contacto };
  };

  const rows = [
    createData("01", "Juan Pérez", "555-1234"),
    createData("02", "María García", "555-2345"),
    createData("03", "Luis Gómez", "555-3456"),
    createData("04", "Ana Rodríguez", "555-4567"),
    createData("05", "Diana Martines", "555-5678"),
  ];

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

  const filteredRows = rows.filter((patient) =>
    patient.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

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

  const columns = [
    { id: "id", label: "ID", align: "left", style: headerCellStyle },
    { id: "nombre", label: "Nombre", align: "center", style: headerCellStyle },
    { id: "contacto", label: "Contacto", align: "center", style: headerCellStyle },
    { id: "actions", label: "Acciones", align: "center", style: headerCellStyle },
  ];

  const actions = (patient) => (
    <>
      <EditButton item={patient} onClick={handleOpenEditDialog} />
      <DeleteButton item={patient} onClick={handleOpenConfirmDialog} />
    </>
  );

  const pathList = [
    { name: "Inventario", route: "/inventario" },
    { name: "Pacientes" },
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