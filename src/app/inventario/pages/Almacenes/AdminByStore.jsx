import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Divider, Grid, Paper, Typography, Select, MenuItem, Tooltip, FormControl, InputLabel, Dialog, DialogTitle, IconButton, DialogContent, TextField, DialogActions, Button, FormHelperText, Zoom } from '@mui/material';
import { ExcelExportButton, SearchBar, TablePaginationActions, CustomTableV2, CustomBreadcrumbs, AlertSnackbar } from '../../components';
import { Close, FilterAltOff, FilterAlt } from '@mui/icons-material';

import { useProductosStore, useAlmacenesStore, useCategoriasStore } from '../../../../hooks'

export const AdminByStore = () => {
  // Estado para la búsqueda de usuarios
  const [search, setSearch] = useState("");
  // Estados para la paginación de la tabla
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [cantidadTrasladar, setCantidadTrasladar] = useState(0);

  const { almacenes, startReadAlmacenes } = useAlmacenesStore();
  const { categorias, startReadCategorias } = useCategoriasStore();

  const onChangeCantidad = (event) => {
    event.preventDefault();
    if (event.target.value < 0) {
      event.target.value = 1;
    }
    setCantidadTrasladar(event.target.value);
  };

  //alert confirmation
  const [openAlert, setOpenAlert] = useState(false);
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const {
    productos,
    productoSeleccionado,
    startReadProductos,
    startBuscarProducto,
    startTrasladarProducto,
  } = useProductosStore();


  useEffect(() => {
    startReadProductos();
    startReadAlmacenes();
    startReadCategorias();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      almacen: "",
    },
  });

  // Estado para el almacen seleccionado
  //const initialStore = (almacenes[0] !== undefined)?almacenes[0].name:"";
  const [selectedStore, setSelectedStore] = useState(almacenes.length > 0 ? almacenes[0].name : "");
  // Estados de funciones de filtros de categorias e icono filtro
  const [showCategoryFilter, setShowCategoryFilter] = useState("");
  const [filterIcon, setFilterIcon] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setPage(0);
    setSelectedCategory(event.target.value);
  };

 

  const handleStoreChange = (event) => {
    setPage(0);
    setSelectedStore(event.target.value);
  };

  const columns = [
    { id: "id", label: "ID", align: "left" },
    { id: "nombre", label: "Nombre", align: "center" },
    { id: "presentacion", label: "Presentación/Talla", align: "center" },
    { id: "proveedor", label: "Proveedor", align: "center" },
    { id: "categoria", label: "Categorías", align: "center" },
    { id: "stock", label: "Stock", align: "center" },
    { id: "acciones-almacen", label: "Acciones", align: "center" },
  ];

  const rows = productos;

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
  const filteredRowsByStore = rows.filter((producto) =>
    selectedStore
      ? producto.almacen.some((store) => store.name === selectedStore)
      : true
  );
  //filtrar por almacen seleccionado y por busqueda de nombre
  const filteredRowsByCategory = filteredRowsByStore.filter((producto) =>
    selectedCategory
      ? producto.categoria.some((category) => category.name === selectedCategory)
      : true
  );
  //filtrar por almacen seleccionado, categoria seleccionada y por busqueda de nombre
  const filteredRows = filteredRowsByCategory.filter((producto) =>
    producto.nombre.toLowerCase().includes(search.toLowerCase())
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

  //STATES AND HANDLES DE EDITAR/TRASLADAR DE ALMACEN
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setCantidadTrasladar(0);
    setOpenEditDialog(false);
    reset({
      almacen: "",
    });
  };

  //trasladar
  const handleSaveEditDialog = (data) => {
    if (data.almacen === productoSeleccionado.almacen[0]._id) {
      alert("Debe seleccionar un almacen diferente al origen");
      reset({ almacen: "", });
      return;
    }
    let categoriasIDs = [];
    productoSeleccionado.categoria.map((current, index) => {
      categoriasIDs.push(current._id);
    });
    let proveedorID = productoSeleccionado.proveedor._id;

    startTrasladarProducto(
      productoSeleccionado._id,
      productoSeleccionado.nombre,
      cantidadTrasladar,
      productoSeleccionado.stock,
      productoSeleccionado.presentacion,
      data.almacen,
      proveedorID,
      categoriasIDs,
      productoSeleccionado.almacen[0].name,
      productoSeleccionado.proveedor.nombre,
      document.getElementById("almacen-select").innerHTML
    );

    //resets
    setCantidadTrasladar(0);
    reset({ almacen: "", });
    setOpenEditDialog(false);
    setOpenAlert(true);
  };

  return (
    <>
      {/* CustomBreadcrumbs */}
      <Grid container justifyContent="center" alignItems="center" sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
          <CustomBreadcrumbs
            pathList={[
              { name: "Inventario", route: "/inventario" },
              { name: "Administración por almacén" },
            ]}
          />
        </Paper>
      </Grid>
      {/* main grid */}
      <Grid container direction="column">
        {/* Almacén y botón de filtro */}
        <Grid container direction="row" justifyContent="space-between" alignItems="start"sx={{ mt: 1 }}>
          <FormControl sx={{ minWidth: "22%" }}>
            <InputLabel id="store-select-label">Almacén</InputLabel>
            <Select
              labelId="store-select-label"
              id="store-select"
              value={selectedStore}
              label="Almacen"
              onChange={handleStoreChange}
            >
              {/* Mapear la lista de almacenes para crear las opciones del Select */}
              {almacenes.map((store) => (
                <MenuItem key={store.id} value={store.name}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tooltip TransitionComponent={Zoom}  title="Filtrar por Categoría" arrow>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => {
                setShowCategoryFilter(!showCategoryFilter);
                setFilterIcon(!filterIcon);
                setSelectedCategory("");
              }}
              aria-label="filter"
              sx={{ mr: showCategoryFilter ? "-52%" : "0%" }}
            >
              {filterIcon ? <FilterAlt /> : <FilterAltOff />}
            </IconButton>
          </Tooltip>
          {showCategoryFilter && (
            <FormControl sx={{ minWidth: "22%" }}>
              <InputLabel
                id="category-select-label"
                sx={{ fontSize: "0.8rem" }}
              >
                Categoría
              </InputLabel>
              <Select
                labelId="category-select-label"
                id="category-select"
                value={selectedCategory}
                label="Categoría"
                onChange={handleCategoryChange}
                sx={{ fontSize: "0.8rem", height: "3.0rem" }}
              >
                {/* Mapear la lista de categorías para crear las opciones del Select */}
                {categorias.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>

        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid>
            <Typography variant="h5" display="inline">
              Productos
            </Typography>
            <Typography variant="subtitle1" display="inline" sx={{ ml: 0.9 }}>
              {`${filteredRowsByCategory.length} total`}
            </Typography>
            <ExcelExportButton
              rows={rows}
              columns={[
                { header: "Nombre", key: "nombre" },
                { header: "Presentación/Talla", key: "presentacion" },
                { header: "Proveedor", key: "proveedor.nombre[0]" },
                { header: "Categorías", key: "categoria" },
                { header: "Stock", key: "stock" },
              ]}
              sheetName={selectedStore}
              fileName="Productos"
              outlined={true}
              fontSize="small"
            />
          </Grid>

          <Grid direction="column" display="flex" sx={{mt:-1.5}}>
            <SearchBar search={search} setSearch={setSearch} setPage={setPage}/>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 0.5 }} />
        {/* tabla display data */}
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
          />
        </Grid>
      </Grid>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>
          Trasladar Producto
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
            label="Producto"
            fullWidth
            variant="outlined"
            disabled={true}
            defaultValue={productoSeleccionado.nombre}
          />
          <TextField
            margin="dense"
            label="Presentación/Talla"
            fullWidth
            disabled={true}
            variant="outlined"
            defaultValue={productoSeleccionado.presentacion}
          />
          <FormHelperText> Origen: </FormHelperText>
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Almacén"
                fullWidth
                disabled={true}
                variant="outlined"
                defaultValue={productoSeleccionado.almacen[0].name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                label="Stock"
                fullWidth
                variant="outlined"
                disabled={true}
                value={productoSeleccionado.stock}
              />
            </Grid>
          </Grid>
          <TextField
            type="number"
            margin="dense"
            label="Cantidad"
            fullWidth
            variant="outlined"
            value={cantidadTrasladar}
            onChange={onChangeCantidad}
          />

          <FormHelperText sx={{ mb: 1 }}> Destino: </FormHelperText>
          <Controller
            name="almacen"
            control={control}
            rules={{
              required: {
                value: true,
                message: "El almacen es obligatorio.",
              },
            }}
            render={({ field }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="almacen-label"> Almacen </InputLabel>
                <Select
                  {...field}
                  labelId="almacen-label"
                  id="almacen-select"
                  label="Almacen"
                  error={!!errors.almacen}
                >
                  {almacenes
                    .filter((almacen) => almacen.name !== selectedStore)
                    .map((almacen) => (
                      <MenuItem key={almacen._id} value={almacen._id}>
                        {almacen.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            )}
          />
          <FormHelperText>
           *Si el producto no existe en el almacén de destino, se creará automáticamente con la cantidad trasladada. En caso de que el producto ya exista, la cantidad trasladada se sumará al stock existente (para que esto sea posible, ambos productos deben tener el mismo nombre).
          </FormHelperText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="error">
            Cancelar
          </Button>
          <Button
            disabled={
              cantidadTrasladar > 0 && cantidadTrasladar <= productoSeleccionado.stock ? false : true
            }
            onClick={handleSubmit(handleSaveEditDialog)}
            color="success"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Material Alert */}
      <AlertSnackbar open={openAlert} onClose={handleCloseAlert} message="Acción realizada exitosamente"/>
    </>
  );
};