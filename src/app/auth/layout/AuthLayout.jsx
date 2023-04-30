import { Grid, Typography } from '@mui/material';

export const AuthLayout = ({ children, title = '' }) => {
  return (
    
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center" /*añadir theme, y en el main.jsx*/
      sx={{ minHeight: '97vh', backgroundColor: 'black'}}
    >
      <Grid item
       className='box-shadow'
       xs={ 3 }
       sx={{ 
            width: { sm: 450 },
            backgroundColor: 'white', 
            padding: 3, 
            borderRadius: 2 ,
        }}>
          <Typography align='center' 
                variant='h5' 
                sx={{ mb: 1 }}>
                { title }
          </Typography>
            { children }
        </Grid>
    </Grid>
  )
}