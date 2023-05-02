import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form"; //npm install react-hook-form
import { Link } from "react-router-dom";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Radio, RadioGroup, TextField, Typography, FormHelperText } from "@mui/material";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, MailOutline as MailOutlineIcon, PersonOutline as PersonOutlineIcon } from "@mui/icons-material";
import { AlertSnackbar, CustomBreadcrumbs } from "../../components";
import { useUsuariosStore } from "../../../../hooks";

export const CreateUsuario = () => {

  const { startCreateUsuario } = useUsuariosStore();
  //alert confirmation
  const [ openAlert, setOpenAlert ] = useState(false);
  //cierra alert
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  // inicialización estado del formulario react-hook-form
  const { control, 
    handleSubmit, 
    formState: { errors }, 
    getValues,
    setValue, 
    reset, 
  } = useForm(
    { defaultValues: { nombre: "", correo: "", contraseña: "", rol: "", },
  });

  //useEffect hook llama funcion setValue del hook useForm para limpiar rol
  useEffect(() => { 
    setValue("rol", ""); 
  }, [setValue]);

  // estado para mostrar contraseña
  const [showPassword, setShowPassword] = useState(false);
  // función para mostrar contraseña
  const handleClickShowPassword = () => { setShowPassword(!showPassword); };

  const onSubmit = () => {
    // Validación y creación del usuario
    let name     = document.getElementById("name").value;
    let email    = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    startCreateUsuario(name, email, password, getValues("rol"));
    
    reset({ nombre: "", correo: "", contraseña: "", rol: "", });
    setOpenAlert(true);
  };

  const pathList = [
    { name: "Inventario", route: "/" },
    { name: "Usuarios", route: "/usuarios" },
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
            Crear Usuario
          </Typography>
          {/* Formulario */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="nombre"
                control={control}
                rules={{
                  required: {
                    value: true, message: "El nombre es obligatorio.",
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
                        <InputAdornment position="start"> <PersonOutlineIcon /> </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="correo"
                control={control}
                rules={{
                  required: {
                    value: true, message: "El correo es obligatorio.",
                  },
                  pattern: {
                    value: /^\S+@\S+\.\S+$/, message: "Ingrese un correo válido.",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    label="Correo"
                    id="email"
                    error={!!errors.correo}
                    helperText={errors.correo?.message}
                    InputProps={{
                      startAdornment: ( <InputAdornment position="start"> <MailOutlineIcon /> </InputAdornment> 
                      ),
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
            <Controller
                  name="contraseña"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "La contraseña es obligatoria.",
                    },
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres.",
                    },
                  }}
                  render={({ field }) => (
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="password">Contraseña</InputLabel>
                      <OutlinedInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                        label="Contraseña"
                        id="password"
                        error={!!errors.contraseña}
                        startAdornment={
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="start"
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                    />
                    {!!errors.contraseña && (
                      <FormHelperText error>
                        {errors.contraseña.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="rol"
                control={control}
                rules={{
                  required: { value: true, message: "Seleccione un rol." },
                }}
                render={({ field }) => (
                  <FormControl component="fieldset" error={!!errors.rol}>
                    <FormLabel component="legend">Rol</FormLabel>
                    <RadioGroup {...field} row aria-label="rol" name="rol" id="rol">
                      <FormControlLabel
                        value="Administrador"
                        control={<Radio />}
                        label="Administrador"
                      />
                      <FormControlLabel
                        value="Colaborador"
                        control={<Radio />}
                        label="Colaborador"
                      />
                    </RadioGroup>
                    {!!errors.rol && (
                      <FormHelperText error>
                        {errors.rol.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Grid>
            {/* Botones */}
            <Grid container justifyContent="space-between" sx={{ mt: 3 }}>
              <Grid item>
                <Link to="/usuarios" style={{ textDecoration: "none" }}>
                  <Button variant="outlined" 
                  color="error">
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
