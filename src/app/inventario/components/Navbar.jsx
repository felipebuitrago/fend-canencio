import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../../../hooks'

export const NavBar = ({ drawerWidth = 240 }) => {
  const params = useParams();
  const { startLogout } = useAuthStore();

  return (
    <AppBar
      position="fixed"
      // sx={{
      //   width: { sm: `calc(100% - ${drawerWidth}px)` },
      //   ml: { sm: `${drawerWidth}px` },
      // }}
      sx={{backgroundColor:'black'}}
    >
      <Toolbar>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            Juan Canencio
          </Typography>

          <Typography align='center' variant="h6" noWrap component="div">
            <Typography align='center'>url:</Typography>
            {`${params['*']}` ? `${params['*']}`.replace('/',' > ') : 'inicio'}
          </Typography>

          <Button onClick={startLogout} variant='outlined' color='success' 
                    sx={{color:'white',borderColor:'white'}} 
                    startIcon={<LogoutOutlined sx={{color:'white'}}/>}>
            Cerrar sesión
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};