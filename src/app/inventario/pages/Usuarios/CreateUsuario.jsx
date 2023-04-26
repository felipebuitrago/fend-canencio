import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, MailOutline as MailOutlineIcon, PersonOutline as PersonOutlineIcon } from "@mui/icons-material";
import { CustomBreadcrumbs } from "../../pages/index.js";

export const CreateUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleChangeCorreo = (e) => {
    setCorreo(e.target.value);
  };

  const handleChangeContraseña = (e) => {
    setContraseña(e.target.value);
  };

  const handleChangeRol = (e) => {
    setRol(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = () => {
    // Validación y creación del usuario
  };

  return (
    <>
      <Grid container alignItems="center" sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
          <CustomBreadcrumbs currentPage="Crear usuario" />
        </Paper>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom sx={{ marginLeft: 1 }}>
            Crear Usuario
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="nombre">Nombre</InputLabel>
                <OutlinedInput
                  id="nombre"
                  value={nombre}
                  onChange={handleChangeNombre}
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  }
                  label="Nombre"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="correo">Correo</InputLabel>
                <OutlinedInput
                  id="correo"
                  value={correo}
                  onChange={handleChangeCorreo}
                  startAdornment={
                    <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>
                  }
                  label="Correo"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="contraseña">Contraseña</InputLabel>
                <OutlinedInput
                  id="contraseña"
                  type={showPassword ? "text" : "password"}
                  value={contraseña}
                  onChange={handleChangeContraseña}
                  startAdornment={
                    <InputAdornment position="start">
                          <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="start"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Rol</FormLabel>
                  <RadioGroup
                    row
                    aria-label="rol"
                    name="rol"
                    value={rol}
                    onChange={handleChangeRol}
                  >
                    <FormControlLabel
                      value="administrador"
                      control={<Radio />}
                      label="Administrador"
                    />
                    <FormControlLabel
                      value="colaborador"
                      control={<Radio />}
                      label="Colaborador"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" sx={{ mt: 3 }}>
              <Grid item>
                <Link to="/admin/usuarios" style={{ textDecoration: "none" }}>
                  <Button variant="outlined" color="error">
                    Atrás
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
  
