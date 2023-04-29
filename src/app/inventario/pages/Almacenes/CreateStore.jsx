import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { StoreMallDirectoryOutlined, PinDropOutlined } from "@mui/icons-material";
import { CustomBreadcrumbs } from "../../components/index.js";
import { useForm, Controller } from "react-hook-form";

export const CreateStore = () => {
  // inicialización estado del formulario react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { nombre: "", ubicacion: "" } });

  const onSubmit = (data) => {
    // Validación y creación del almacen
  };

  const pathList = [
    { name: "Inventario", route: "/" },
    { name: "Almacenes", route: "/almacenes" },
    { name: "Crear" },
  ];

  return (
    <>
      {/* Encabezado */}
      <Grid container alignItems="center" sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
          <CustomBreadcrumbs pathList={pathList} />
        </Paper>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom sx={{ marginLeft: 1 }}>
            Crear Almacén
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
                          <StoreMallDirectoryOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="ubicacion"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "La ubicación es obligatoria.",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    label="Ubicación"
                    error={!!errors.ubicacion}
                    helperText={errors.ubicacion?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PinDropOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            {/* Botones */}
            <Grid container justifyContent="space-between" sx={{ mt: 3 }}>
              <Grid item>
                <Link to="/almacenes" style={{ textDecoration: "none" }}>
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
