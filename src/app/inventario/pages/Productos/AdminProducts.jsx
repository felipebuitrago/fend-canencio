import { Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
//import { DataGrid } from '@mui/x-data-grid';metodo para hacer otro tipo de table
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {Search, EditOutlined, DeleteForeverOutlined} from '@mui/icons-material'
//import { Breadcrumbs, Link as MuiLink } from '@mui/material';
export const AdminProducts = () => {

  const [value, setValue] = React.useState('Todos');
  
  const dataInventario = useSelector((state) => state.inventario)
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };    

  const createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('01', 'Faja gorda',0, 0, 0),
    createData('02', 'inyeccion +100mana',0, 0, 0),
    createData('03', '100 pts vida', 0, 0, 0),
    createData('04', '+20 habilidad',0, 0, 0),
    createData('05', '+20 vitalidad', 0, 0, 0),

  ];


  return (
    <>
      {/* <Link to='editar'>
            <Button variant='contained'>Editar</Button>
          </Link>
          {console.log(dataInventario.productos)}*/}

      {/* main grid */}
      <Grid container direction="column">
        {/* barra superior, btn crear y busqueda */}
        <Grid container direction="row" justifyContent="space-between">
          {/* L. Titulo Pagina y btn crear */}
          <Grid direction="column">
            <Typography variant="h4">Productos</Typography>

            <Button
              variant="contained"
              fullWidth
              color="success"
              size="large"
              sx={{ backgroundColor: "black", color: "white", mt: 3 }}
            >
              Crear producto
            </Button>
          </Grid>

          {/* R. componentes de busqueda */}
          <Grid direction="column" display="flex">
            <Grid container direction="row">
              <TextField
                label="Buscar"
                variant="outlined"
                sx={{ transform: "scale(0.9)" }}
              ></TextField>
              <Button
                variant="contained"
                size="small"
                color="success"
                sx={{ transform: "scale(0.8)", ml: -2 }}
              >
                <Search />
              </Button>
            </Grid>

            <FormControl sx={{ mt: 1 }}>
              <FormLabel id="filtros-busqueda-productos">Filtros</FormLabel>
              <RadioGroup
                row
                aria-labelledby="filtros-busqueda-productos"
                name="filtros-busqueda-productos"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Todos"
                  control={<Radio size="small" />}
                  label="Todos"
                />
                <FormControlLabel
                  value="Insumos"
                  control={<Radio size="small" />}
                  label="Insumos"
                />
                <FormControlLabel
                  value="Fajas"
                  control={<Radio size="small" />}
                  label="Fajas"
                />
              </RadioGroup>
            </FormControl>
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
                      color: "white",
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
                    Presentación/Talla
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
                    Proveedor
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
                    Categoría
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
                    Almacen
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
                    Stock
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
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.protein}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="contained"
                        color="info"
                        sx={{ transform: "scale(0.9)" }}
                      >
                        <EditOutlined />
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        sx={{ transform: "scale(0.9)" }}
                      >
                        <DeleteForeverOutlined />
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
