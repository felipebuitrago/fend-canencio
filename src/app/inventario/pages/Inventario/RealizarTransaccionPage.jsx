import React, { useState, useEffect } from "react";
import { Grid, IconButton, Typography, Paper, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, FormControl, InputLabel, Select, Chip, Autocomplete, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Close } from "@mui/icons-material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
import es from "dayjs/locale/es";

import { CustomBreadcrumbs, CustomTableV2,  TablePaginationActions,  SearchBar, AlertSnackbar } from "../../components/index.js";


export const RealizarTransaccionPage = () => {
  dayjs.extend(utc);
  dayjs.extend(localizedFormat);
  dayjs.locale(es);

  const [selectedDate, setSelectedDate] = React.useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Datos de prueba
  const categorias = ["A", "B", "C"];
  const almacenes = ["Almacen 1", "Almacen 2", "Almacen 3"];
  const pacientes = [
    { label: "Paciente 1" },
    { label: "Paciente 2" },
    { label: "Paciente 3" },
  ];
  const proveedores = [
    { label: "Proveedor 1" },
    { label: "Proveedor 2" },
    { label: "Proveedor 3" },
  ];

  const columns = [
    { id: "id", label: "ID", width: 70 },
    { id: "nombre", label: "Nombre", width: 130 },
    { id: "categoria", label: "Categoría", width: 130 },
    { id: "almacen", label: "Almacén", width: 130 },
    { id: "cantidad", label: "Cantidad", width: 130 },
    { id: "acciones", label: "Acciones", width: 130 },
  ];

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [selectedCategorias, setSelectedCategorias] = useState([]);

  const [rows, setRows] = useState([]); // state to hold the table data
  const [filteredRows, setFilteredRows] = useState([]); // state to hold the filtered table data
  const [searchText, setSearchText] = useState(""); // state to hold the search text
  const [page, setPage] = useState(0); // state to hold the current page number
  const [rowsPerPage, setRowsPerPage] = useState(5); // state to hold the number of rows to display per page

  const handleSearch = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    // simulate API call to fetch data
    const fetchData = async () => {
      const data = [
        {
          id: 1,
          nombre: "Item 1",
          categoria: { name: "A" },
          almacen: [{ name: "Almacen 1" }],
          cantidad: 10,
        },
        {
          id: 2,
          nombre: "Item 2",
          categoria: { name: "B" },
          almacen: [{ name: "Almacen 2" }],
          cantidad: 20,
        },
        {
          id: 3,
          nombre: "Item 3",
          categoria: { name: "C" },
          almacen: [{ name: "Almacen 3" }],
          cantidad: 30,
        },
      ];
      setRows(data);
      setFilteredRows(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = rows.filter((row) => {
      const rowValues = Object.values(row).join(" ").toLowerCase();
      return rowValues.includes(searchText.toLowerCase());
    });

    setFilteredRows(filteredData);
    setPage(0); // reset the page number
  }, [rows, searchText]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // reset the page number
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);

  const [tipoMovimiento, setTipoMovimiento] = useState("ingreso");
  const handleTipoMovimientoChange = (event) => {
    setTipoMovimiento(event.target.value);
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 3, width: "100%" }}
      >
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
          <CustomBreadcrumbs
            pathList={[
              { name: "Inventario", route: "/inventario" },
              { name: "Realizar Transacción" },
            ]}
          />
        </Paper>
      </Grid>
      <Typography variant="h4" gutterBottom>
        Realizar Transacción
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="categorias-label">Categoría</InputLabel>
            <Select
              labelId="categorias-label"
              multiple
              value={selectedCategorias}
              onChange={(event) => setSelectedCategorias(event.target.value)}
              renderValue={(selected) => (
                <div sx={{ display: "flex", flexWrap: "wrap" }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} sx={{ m: 0.5 }} />
                  ))}
                </div>
              )}
            >
              {categorias.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="almacen-label">Almacén</InputLabel>
            <Select labelId="almacen-label">
              {almacenes.map((almacen) => (
                <MenuItem key={almacen} value={almacen}>
                  {almacen}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Buscar"
            variant="outlined"
            margin="dense"
          />
        </Grid>
      </Grid>

      <CustomTableV2
        columns={columns}
        filteredRows={filteredRows}
        page={page}
        rowsPerPage={rowsPerPage}
        emptyRows={emptyRows}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        TablePaginationActions={TablePaginationActions}
      />

      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Realizar Transacción
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Realizar Movimiento
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
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
            disabled
          />
          <TextField
            margin="dense"
            label="Talla/Presentación"
            fullWidth
            variant="outlined"
            disabled
          />
          <TextField
            margin="dense"
            label="Cantidad"
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
              getOptionLabel={(option) => option.label}
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
              getOptionLabel={(option) => option.label}
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
          <Button onClick={handleCloseDialog} color="error">
            Cancelar
          </Button>
          <Button onClick={handleCloseDialog} color="success">
            Inventariar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
