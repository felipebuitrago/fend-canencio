import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid,  InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { PersonOutline, PermPhoneMsgOutlined } from "@mui/icons-material";
import { CustomBreadcrumbs } from "../../../components/index.js";
import { useForm, Controller } from "react-hook-form";

export const CreatePaciente = () => {
  // inicialización estado del formulario react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { nombre: "", contacto: "" } });

  const onSubmit = (data) => {
    // Validación y creación del paciente
  };

  const pathList = [
    { name: "Inventario", route: "/" },
    { name: "Pacientes", route: "/pacientes" },
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
            Crear Paciente
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
                          <PersonOutline />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="contacto"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "El contacto es obligatorio.",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    label="Contacto"
                    error={!!errors.contacto}
                    helperText={errors.contacto?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PermPhoneMsgOutlined/>
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
                <Link to="/pacientes" style={{ textDecoration: "none" }}>
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
