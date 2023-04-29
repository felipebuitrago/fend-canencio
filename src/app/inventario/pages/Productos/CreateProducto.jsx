import React from "react";
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
  Box,
  Chip,
  OutlinedInput,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Category, Store,TypeSpecimenOutlined, FlipToFrontOutlined, SquareFootOutlined } from "@mui/icons-material";
import { CustomBreadcrumbs, MultipleSelectChip } from "../../components";

// Reemplaza estos datos de ejemplo con tus datos reales
const categorias = [
  { id: 1, nombre: "Categoría 1" },
  { id: 2, nombre: "Categoría 2" },
  { id: 3, nombre: "Categoría 3" },
];

const proveedores = [
  { id: 1, nombre: "Proveedor 1" },
  { id: 2, nombre: "Proveedor 2" },
  { id: 3, nombre: "Proveedor 3" },
];

const almacenes = [
  { id: 1, nombre: "Almacén 1" },
  { id: 2, nombre: "Almacén 2" },
  { id: 3, nombre: "Almacén 3" },
];

export const CreateProducto = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      talla_presentacion: "",
      categoria: [],
      proveedor: "",
      almacen: [],
    },
  });

  const onSubmit = (data) => {
    // Validación y creación del producto
    console.log(data);
  };

  return (
    <>
      {/* Encabezado */}
      <Grid container alignItems="center" sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
          {/* Asegúrate de actualizar el componente CustomBreadcrumbs según sea necesario */}
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
                name="talla_presentacion"
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
                    error={!!errors.talla_presentacion}
                    helperText={errors.talla_presentacion?.message}
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
                    icon={<Category />}
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
                    >
                      {proveedores.map((proveedor) => (
                        <MenuItem key={proveedor.id} value={proveedor.id}>
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
                    onChange={field.onChange}
                    icon={<Store />}
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
    </>
  );
};
