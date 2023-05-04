import React, { useState, useEffect } from "react";
import { Grid, Divider, IconButton, Typography, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, FormControl, InputLabel, Select, Chip, Autocomplete, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Close } from "@mui/icons-material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
import es from "dayjs/locale/es";

import {  CustomBreadcrumbs, CustomTableV2, TablePaginationActions, MultipleSelectChip,  SearchBar, AlertSnackbar } from "../../components/index.js";
import { Controller, useForm } from 'react-hook-form';
import { useProductosStore, useCategoriasStore, usePacientesStore, useProveedoresStore, useAlmacenesStore } from '../../../../hooks'


export const RealizarTransaccionPage = () => {
  // Configuración de la fecha
  dayjs.extend(utc);
  dayjs.extend(localizedFormat);
  dayjs.locale(es);

  // Estado para la búsqueda de usuarios
  const [search, setSearch] = React.useState("");
  // Estados para la paginación de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const [rows, setRows] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const {
    productos,
    productoSeleccionado,
    setProductoSeleccionado,
    startReadProductos,
    startBuscarProducto,
  } = useProductosStore();
  
  const { almacen, startReadAlmacenes } = useAlmacenesStore();
  const { pacientes, startReadPacientes } = usePacientesStore();
  const { proveedores, startReadProveedores } = useProveedoresStore();

  // Estado para el diálogo de edición (movimientos inventariar)
  useEffect(() => {
    startReadProductos();
    startReadAlmacenes();
    startReadPacientes();
    startReadProveedores();
  }, []);

  useEffect(() => {
    setRows(productos);
  }, [productos]);

  const columns = [
    { id: "id", label: "ID", align: "center" },
    { id: "nombre", label: "Producto", align: "center" },
    { id: "presentacion", label: "Presentación/Talla", align: "center" },
    { id: "categoria", label: "Categoría", align: "center" },
    { id: "almacen", label: "Almacén", align: "center" },
    { id: "stock", label: "Stock", align: "center" },
    { id: "acciones-movimientos", label: "Acciones", align: "center" },
  ];

  {
    /* evento de editar cierto producto */
  }
  const handleUpdateClick = (event) => {
    if (event.target.id !== "") {
      startBuscarProducto(event.target.id);
      handleOpenEditDialog();
    } else {
      startBuscarProducto(event.target.farthestViewportElement.id);
      handleOpenEditDialog();
    }
  };

  // Estado para el diálogo de edición (movimientos inventariar)
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  
  // Estado para las categorías seleccionadas
  const [selectedCategorias, setSelectedCategorias] = useState([]);

  // Filtra los productos por nombre y categoría (categoria se eliminó por el momento)
  const filteredRows = rows.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategorias.length === 0 ||
        selectedCategorias.includes(producto.categoria))
  ); 

  // Calcula el número de filas vacías para rellenar la tabla
  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

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
  
  //handle tipo de movimiento(egrso o ingreso)
  const [tipoMovimiento, setTipoMovimiento] = useState("ingreso");
  const handleTipoMovimientoChange = (event) => {
    setTipoMovimiento(event.target.value);
  }; 

  return (
    <>
      <Grid container  justifyContent="center"  alignItems="center" sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
          <CustomBreadcrumbs
            pathList={[
              { name: "Inventario", route: "/inventario" },
              { name: "Realizar movimientos" },
            ]}
          />
        </Paper>
      </Grid>
      <Grid container direction="column">
          {/* barra superior, btn crear y busqueda */}
          <Grid container direction="row" justifyContent="space-between">
            {/* L. Titulo Pagina y btn crear */}
            <Grid direction="column">
              <Typography variant="h4" display="inline">
                Realizar movimientos
              </Typography>
            </Grid>
            {/*componentes de busqueda */}
            <Grid direction="column" display="flex">
              <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
            </Grid>
          </Grid>
        <Divider sx={{ mt: 2 }} />
        {/* Tabla de productos */}
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
        />

      </Grid>
      {/*Dialogo para hacer movimientos de productos en inventario*/}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>
          Realizar Movimiento
          <IconButton
            aria-label="close"
            onClick={handleCloseEditDialog}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Tipo de movimiento</FormLabel>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <RadioGroup
                  row
                  aria-label="tipoMovimiento"
                  name="tipoMovimiento"
                  value={tipoMovimiento}
                  onChange={handleTipoMovimientoChange}
                  style={{ marginRight: 40 }}
                >
                  <FormControlLabel
                    value="ingreso"
                    control={<Radio />}
                    label="Ingreso"
                  />
                  <FormControlLabel
                    value="egreso"
                    control={<Radio />}
                    label="Egreso"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} locale={es}>
                  <DatePicker
                    label="Fecha"
                    value={selectedDate}
                    onChange={handleDateChange}
                    fullWidth
                    inputFormat="DD/MM/YYYY"
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        variant="outlined"
                        margin="dense"
                        value={
                          selectedDate
                            ? dayjs(selectedDate).format("DD/MM/YYYY")
                            : ""
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </FormControl>

          <TextField
            autoFocus
            margin="dense"
            label="Nombre"
            fullWidth
            variant="outlined"
            value={productoSeleccionado?.nombre || ""}
            disabled
          />
          <TextField
            margin="dense"
            label="Talla/Presentación"
            fullWidth
            variant="outlined"
            value={productoSeleccionado?.presentacion || ""}
            disabled
          />
          <TextField
            margin="dense"
            label="almacen"
            fullWidth
            variant="outlined"
            value={productoSeleccionado?.almacen?.name|| ""}
            disabled
          />

          <TextField
            margin="dense"
            label="cantidad"
            fullWidth
            variant="outlined"
            type="number"
            inputProps={{ min: 1 }}
            onChange={(event) => {
              if (event.target.value < 1) {
                event.target.value = 1;
              }
            }}
          />
          {tipoMovimiento === "ingreso" && (
            <Autocomplete
              options={pacientes}
              getOptionLabel={(option) => option.name}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Paciente"
                  variant="outlined"
                  margin="dense"
                />
              )}
            />
          )}

          {tipoMovimiento === "egreso" && (
            <Autocomplete
              options={proveedores}
              getOptionLabel={(option) => option.nombre}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Proveedor"
                  variant="outlined"
                  margin="dense"
                />
              )}
            />
          )}
          <TextField margin="dense" label="Nota" fullWidth variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="error">
            Cancelar
          </Button>
          <Button onClick={handleCloseEditDialog} color="success">
            Inventariar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};