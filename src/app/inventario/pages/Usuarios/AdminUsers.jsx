import { Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {Search, EditOutlined, DeleteForeverOutlined} from '@mui/icons-material'

export const AdminUsers = () => {

  const [value, setValue] = React.useState('Todos');
  
  const dataUsuarios = useSelector((state) => state.usuarios)
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const createData = (id, nombre, correo, rol) => {
    return { id, nombre, correo, rol };
  }
  
  const rows = [
    createData('01', 'Juan Pérez', 'juan@gmail.com', 'Admin'),
    createData('02', 'María García', 'maria@gmail.com', 'Usuario'),
    createData('03', 'Luis Gómez', 'luis@gmail.com', 'Usuario'),
    createData('04', 'Ana Rodríguez', 'ana@gmail.com', 'Admin'),
    createData('05', 'Pedro Martínez', 'pedro@gmail.com', 'Usuario'),
  ];


  return (
    <>
      {/* main grid */}
      <Grid container direction="column">
       
        {/* barra superior, btn crear y busqueda */}
        <Grid container direction="row" justifyContent="space-between">
          {/* L. Titulo Pagina y btn crear */}
          <Grid direction="column">
            <Typography variant="h4">Usuarios</Typography>

            <Button
              variant="contained"
              fullWidth
              color="success"
              size="large"
              sx={{ backgroundColor: "black", color: "white", mt: 3 }}
            >
              Crear usuario
            </Button>
          </Grid>

          {/* componentes de busqueda */}
          <Grid direction="column" display="flex">
            <Grid container direction="row" sx={{mt:3}}>
              <TextField label="Buscar" variant="outlined" sx={{transform:'scale(0.9)'}}></TextField>
              <Button variant='contained' size='small' color="success" sx={{transform:'scale(0.8)',ml:-2}}><Search/></Button>
            </Grid>
            
          </Grid>
        </Grid>
        {/* fin barra superior */}

        <Divider sx={{ mt: 2 }} />

        {/* tabla display data */}
        <Grid container direction="column">
          <TableContainer component="div">
            <Table aria-label="simple table">
              <TableHead sx={{ background: "black" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      color:
                      "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                      }}
                      >
                      ID
                      </TableCell>
                      <TableCell
                      sx={{
                      color: "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                      }}
                      align="center"
                      >
                      Nombre
                      </TableCell>
                      <TableCell
                      sx={{
                      color: "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                      }}
                      align="center"
                      >
                      Correo
                      </TableCell>
                      <TableCell
                      sx={{
                      color: "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                      }}
                      align="center"
                      >
                      Rol
                      </TableCell>
                      <TableCell
                      sx={{
                      color: "white",
                      borderRightColor: "white",
                      borderRightWidth: 1,
                      borderRightStyle: "solid",
                      }}
                      align="center"
                      >
                      Acciones
                      </TableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody>
                      {rows.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>{user.id}</TableCell>
                          <TableCell align="center">{user.nombre}</TableCell>
                          <TableCell align="center">{user.correo}</TableCell>
                          <TableCell align="center">{user.rol}</TableCell>
                          <TableCell align="center">
                            <Button
                              size="small"
                              variant="contained"
                              color="info"
                              sx={{ transform: "scale(0.9)" }}
                            >
                              <EditOutlined/>
                          
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              color="error"
                              sx={{ transform: "scale(0.9)" }}
                            >
                              <DeleteForeverOutlined/>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* fin tabla display data */}

    </Grid>
  </>
  );
}