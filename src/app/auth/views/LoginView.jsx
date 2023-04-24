import { useEffect } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import { Login } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';

import { AuthLayout } from '../layout/AuthLayout';

import { useForm, useAuthStore } from '../../../hooks'

const loginFormFields = {
  usuario : '',
  password: '',
}


export const LoginView = () => {

  const { startLogin, errorMessage } = useAuthStore();
  
  const { usuario, password, onInputChange } = useForm(loginFormFields);

  useEffect(()=>{
      if(errorMessage !== undefined){
        alert("error en la autenticacion")
      }
  },[errorMessage])
  
  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({email : usuario, password: password});
  }

  return (
    <AuthLayout title="Inicia Sesión">
      <form onSubmit={ loginSubmit }>
          <Grid container>
            
            <Grid item xs={ 12 } sx={{ mt: 2}}>
              <TextField 
                label="Usuario" 
                type="text" 
                placeholder='usuario'
                name='usuario'
                value={ usuario }
                onChange={ onInputChange } 
                fullWidth
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                name='password'
                value={ password }
                onChange={ onInputChange } 
                fullWidth
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 12 } >
                
                <Button type='submit' variant='contained' color='success' fullWidth>
                     Iniciar Sesión
                  <Login sx={{pl:1}}/>
                </Button>

              </Grid>            
            </Grid>
          </Grid>
        </form>
    </AuthLayout>
  )
}