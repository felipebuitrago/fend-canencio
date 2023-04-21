import { Link, Link as RouterLink } from 'react-router-dom';
import { Login } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
// import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';


export const LoginView = () => {
  return (
    <AuthLayout title="Inicia Sesión">
      <form>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Usuario" 
                type="text" 
                placeholder='usuario' 
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 12 } >
                <Button variant='contained' color='success' fullWidth>
                  <Link to='/inventario' >
                     Iniciar Sesión
                  </Link>
                  <Login sx={{pl:1}}/>
                </Button>
              </Grid>
              {/* <Grid item xs={ 12 } sm={ 6 }>
                <Button variant='contained' fullWidth>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid> */}
            </Grid>


            {/* <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid> */}

          </Grid>


        </form>

    </AuthLayout>
  )
}