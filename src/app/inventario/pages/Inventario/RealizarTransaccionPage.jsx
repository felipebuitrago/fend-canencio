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
import { useProductosStore, usePacientesStore, useMovimientosStore } from '../../../../hooks'


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
    startReadProductos,
    startBuscarProducto,
  } = useProductosStore();

  const {
    startCreateMovimiento
  } = useMovimientosStore();
  
  const { pacientes, startReadPacientes } = usePacientesStore();

  // Estado para el diálogo de edición (movimientos inventariar)
  useEffect(() => {
    startReadProductos();
    startReadPacientes();
  }, []);

  useEffect(() => { // ¿?
    setRows(productos);  // Is this another way to do SearchBar.jsx? 
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
    setSelectedDate(null);
    setCantidad(0);
    setOpenEditDialog(false);
  };
  

  // Filtra los productos por nombre y categoría (categoria se eliminó por el momento)
  const filteredRows = rows.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(search.toLowerCase()) 
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

  //cantidad a ingresar/egresar
  const [cantidad, setCantidad] = useState(0);

  const handleSaveMoveDialog = () => {
    
    const nota = (document.getElementById("nota-move-input").value.length < 1)?" ":document.getElementById("nota-move-input").value;
    
    if(tipoMovimiento === "egreso"){
      
      const paciente = document.getElementById("paciente-move-input").value;
      if (paciente.length < 1) {
        alert("Paciente es requerido");
        return;
      }
     
      startCreateMovimiento("Egreso", 
        productoSeleccionado.nombre, 
        productoSeleccionado.presentacion, 
        productoSeleccionado.almacen[0].name, 
        paciente, 
        dayjs(selectedDate).format("DD/MM/YYYY"), 
        (parseInt(cantidad)), 
        nota,
        productoSeleccionado._id,
        (parseInt(productoSeleccionado.stock) - parseInt(cantidad))
      );
    }
    else if(tipoMovimiento === "ingreso"){
  
      startCreateMovimiento("Ingreso", 
        productoSeleccionado.nombre, 
        productoSeleccionado.presentacion, 
        productoSeleccionado.almacen[0].name, 
        productoSeleccionado.proveedor.nombre, 
        dayjs(selectedDate).format("DD/MM/YYYY"), 
        (parseInt(cantidad)), 
        nota,
        productoSeleccionado._id,
        (parseInt(productoSeleccionado.stock) + parseInt(cantidad))
      );
    }
    setSelectedDate(null);
    setCantidad(0);
    setOpenEditDialog(false);
    setOpenAlert(true);
  }

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
            label="Producto"
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

          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Almacen"
                fullWidth
                variant="outlined"
                value={productoSeleccionado?.almacen[0]?.name|| ""}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={6}>

              <TextField
                margin="dense"
                label="Stock"
                fullWidth
                variant="outlined"
                disabled
                value={productoSeleccionado?.stock|| ""}
              />
            </Grid>

          </Grid>
          
          <TextField
            margin="dense"
            label="Cantidad"
            fullWidth
            variant="outlined"
            type="number"
            value={cantidad}
            onChange={(event) => {
              if (event.target.value < 0) {
                event.target.value = 1;
              }
              setCantidad(event.target.value);
            }}
          />

          {tipoMovimiento === "egreso" && (
            <Autocomplete
              options={pacientes}
              getOptionLabel={(option) => option.name}
              fullWidth
              id="paciente-move-input"
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

          {/* 
          {tipoMovimiento === "egreso" && (
            <Autocomplete
              options={proveedores}
              getOptionLabel={(option) => option.nombre}
              fullWidth
              id="proveedor-move-input"
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
          */}

          <TextField 
            margin="dense" 
            label="Nota" 
            id="nota-move-input"
            fullWidth 
            variant="outlined" 
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="error">
            Cancelar
          </Button>
          <Button 
            disabled={(((cantidad>0 && cantidad<=productoSeleccionado.stock) || (tipoMovimiento
              ==="ingreso" && cantidad >=1)) && selectedDate!==null)?false :true }
            onClick={handleSaveMoveDialog} 
            color="success">
            Inventariar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Material Alert */}
      <AlertSnackbar open={openAlert} onClose={handleCloseAlert} message="Acción realizada exitosamente"/>
    
    </>
  );
};