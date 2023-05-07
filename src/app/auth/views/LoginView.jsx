import { useForm } from 'react-hook-form';
import { useEffect, useState } from "react";
import { Login, MailOutlined, PasswordOutlined } from "@mui/icons-material";
import { Button, Grid, FormControl,InputAdornment,FormHelperText, InputLabel, OutlinedInput, Snackbar, Alert, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { AuthLayout } from "../layout/AuthLayout";
import { useAuthStore } from "../../../hooks";

const slideIn = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const StyledAlert = styled(Alert)`
  font-size: 1.2rem;
  animation: ${slideIn} 0.5s ease-out;
`;

const loginFormFields = {
  usuario: "",
  password: "",
};

export const LoginView = () => {
  const { startLogin, errorMessage } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formValues, setFormValues] = useState(loginFormFields);
  const { usuario, password } = formValues;

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (errorMessage !== undefined) {
      setOpenSnackbar(true);
    }
  }, [errorMessage]);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const loginSubmit = (data) => {
    startLogin({ email: data.usuario, password: data.password });
  };

  const isEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <AuthLayout title="Inicia Sesión">
      <form onSubmit={handleSubmit(loginSubmit)}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
          <FormControl fullWidth variant="outlined" error={!!errors.usuario}>
              <InputLabel htmlFor="usuario">Correo</InputLabel>
              <OutlinedInput
                id="usuario"
                label="Usuario"
                type="text"
                name="usuario"
                {...register("usuario", {
                  required: "El correo electrónico es requerido, por favor ingrese su correo",
                  validate: (value) =>
                    isEmail(value) || "Ingrese un correo electrónico válido",
                })}
                startAdornment={
                  <InputAdornment position="start">
                    <MailOutlined />
                  </InputAdornment>
                }
              />
              {errors.usuario && (
                <FormHelperText>{errors.usuario.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
          <FormControl fullWidth variant="outlined" error={!!errors.password}>
              <InputLabel htmlFor="password">Contraseña</InputLabel>
              <OutlinedInput
                id="password"
                label="Contraseña"
                type="password"
                name="password"
                {...register("password", {
                  required: "La contraseña es requerida, por favor ingrese su contraseña",
                })}
                startAdornment={
                  <InputAdornment position="start">
                    <PasswordOutlined />
                  </InputAdornment>
                }
              />
              {errors.password && (
                <FormHelperText>{errors.password.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                fullWidth
              >
                Iniciar Sesión
                <Login sx={{ pl: 1 }} />
              </Button>
            </Grid>
            <Grid container justifyContent="center" sx={{ mt: 1 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                component="button"
                onClick={(event) => {
                  event.preventDefault();
                  handleDialogOpen();
                }}
                sx={{ cursor: "pointer" }}
              >
                ¿Has olvidado las credenciales de acceso?
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {/* Snackbar de error en la autenticación */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <StyledAlert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error en la autenticación del usuario
        </StyledAlert>
      </Snackbar>
      {/* Dialogo de credenciales olvidadas */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Credenciales de acceso olvidadas"}
        </DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            Si ha olvidado su usuario, correo electrónico o contraseña, por
            favor, póngase en contacto con un administrador para recibir
            asistencia.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="success" autoFocus>
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </AuthLayout>
  );
};