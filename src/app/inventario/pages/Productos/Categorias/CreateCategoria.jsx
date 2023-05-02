import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { Category, Description } from "@mui/icons-material";
import { AlertSnackbar, CustomBreadcrumbs } from "../../../components";
import { useForm, Controller } from "react-hook-form";
import { useCategoriasStore } from "../../../../../hooks";

export const CreateCategoria = () => {
  
  const { startCreateCategoria } = useCategoriasStore();
  //alert confirmation
  const [ openAlert, setOpenAlert ] = useState(false);
  // Cierra el alert
  const handleCloseAlert = () => {
  setOpenAlert(false);
};

  // inicialización estado del formulario react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ defaultValues: { nombre: "", descripcion: "" } });

  const onSubmit = () => {
    // Validación y creación de la categoría
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;

    startCreateCategoria(name, description);
    
    reset({ nombre: "", descripcion: "" });
    setOpenAlert(true);
  };

  const pathList = [
    { name: "Inventario", route: "/" },
    { name: "Categorías", route: "/categorias" },
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
            Crear Categoría
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
                    id="name"
                    error={!!errors.nombre}
                    helperText={errors.nombre?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Category />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="descripcion"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "La descripción es obligatoria.",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    label="Descripción"
                    id="description"
                    error={!!errors.descripcion}
                    helperText={errors.descripcion?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Description />
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
                <Link to="/categorias" style={{ textDecoration: "none" }}>
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
