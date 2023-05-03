import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Category, Store, ConnectWithoutContactOutlined, FlipToFrontOutlined, SquareFootOutlined } from "@mui/icons-material";

import { AlertSnackbar, CustomBreadcrumbs, MultipleSelectChip } from "../../components";
import { useAlmacenesStore, useCategoriasStore, useProductosStore, useProveedoresStore } from '../../../../hooks'

export const CreateProducto = () => {

  const {categorias, startReadCategorias} = useCategoriasStore();
  const {proveedores, startReadProveedores} = useProveedoresStore();
  const {almacenes, startReadAlmacenes} = useAlmacenesStore();
  const { startCreateProducto } = useProductosStore();

  useEffect(()=>{
    startReadAlmacenes();
    startReadCategorias();
    startReadProveedores();
  },[])
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      nombre: "",
      presentacion: "",
      categoria: [],
      proveedor: "",
      almacen: [],
    },
  });

  //alert confirmation
  const [openAlert, setOpenAlert] = useState(false);
  // Cierra el alert
  const handleCloseAlert = () => {
  setOpenAlert(false);
  };

  const onSubmit = (data) => {
    // Validación y creación del producto

    const {nombre, presentacion, categoria, proveedor, almacen} = data;
    startCreateProducto(nombre, presentacion, categoria, proveedor, almacen);
    reset({
      nombre: "",
      presentacion: "",
      categoria: [],
      proveedor: "",
      almacen: [],
    });
    setOpenAlert(true);
  };

  return (
    <>
      {/* Encabezado */}
      <Grid container alignItems="center" sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
          <CustomBreadcrumbs pathList={[
            { name: "Inventario", route: "/"},
            { name: "Productos" , route: '/productos'}, 
            { name: "Crear" , }]} 
          />
        </Paper>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom sx={{ marginLeft: 1 }}>
            Crear Producto
          </Typography>
          {/* Formulario */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="nombre"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "El nombre es obligatorio.",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    label="Nombre"
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FlipToFrontOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="presentacion"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "La talla/presentación es obligatoria.",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    label="Talla/Presentación"
                    error={!!errors.presentacion}
                    helperText={errors.presentacion?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SquareFootOutlined/>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="categoria"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "La categoría es obligatoria.",
                  },
                }}
                render={({ field }) => (
                  <MultipleSelectChip
                    label="Categoría"
                    items={categorias}
                    value={field.value}
                    onChange={field.onChange}
                    error={!!errors.categoria}
                    icon={<Category id="icon-black"/>}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="proveedor"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "El proveedor es obligatorio.",
                  },
                }}
                render={({ field }) => (
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="proveedor-select-label">
                      Proveedor
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="proveedor-select-label"
                      id="proveedor-select"
                      label="Proveedor"
                      error={!!errors.proveedor}
                      startAdornment={
                        <InputAdornment position="start">
                          <IconButton edge="start">
                            <ConnectWithoutContactOutlined id="icon-black"/>
                          </IconButton>
                        </InputAdornment>
                      }
                    >
                      {proveedores.map((proveedor) => (
                        <MenuItem key={proveedor._id} value={proveedor._id}>
                          {proveedor.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="almacen"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "El almacén es obligatorio.",
                  },
                }}
                render={({ field }) => (
                  <MultipleSelectChip
                    label="Almacén"
                    items={almacenes}
                    value={field.value}
                    valid={errors.almacen}
                    error={!!errors.almacen}
                    onChange={field.onChange}
                    icon={<Store id="icon-black"/>}
                  />
                )}
              />
            </Grid>
            {/* Botones */}
            <Grid container justifyContent="space-between" sx={{ mt: 3 }}>
              <Grid item>
                <Link to="/productos" style={{ textDecoration: "none" }}>
                  <Button variant="outlined" color="error">
                    Atrás
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit(onSubmit)}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    
      {/* Material Alert */}
      <AlertSnackbar open={openAlert} onClose={handleCloseAlert} message="Acción realizada exitosamente"/>
    
    </>
  );
};
