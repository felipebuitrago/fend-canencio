import { Divider, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { LibraryAddOutlined } from '@mui/icons-material';

import { useProductosStore } from '../../../../hooks'
import { SearchBar, TablePaginationActions, CustomTableV2, CustomBreadcrumbs, ButtonLink } from '../../components';

export const AdminProducts = () => {

  // Estado para la búsqueda de usuarios
  const [search, setSearch] = React.useState("");
  // Estados para la paginación de la tabla
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const {productos, 
    startCreateProducto, 
    startReadProductos, 
    startUpdateProducto, 
    startDeleteProducto} = useProductosStore();
    
  useEffect(()=>{
    startReadProductos();
  },[])

  const columns = [
    { id: "idpersonalizado", label: "ID", align: "left"},
    { id: "nombre", label: "Nombre", align: "center"},
    { id: "presentacion", label: "Presentación/Talla", align: "center"},
    { id: "proveedor", label: "Proveedor", align: "center"},
    { id: "categoria", label: "Categoría", align: "center"},
    { id: "almacen", label: "Almacen", align: "center"},
    { id: "stock", label: "Stock", align: "center"},
    { id: "acciones", label: "Acciones", align: "center"},
  ];
  const rows = productos;
  
  {/* evento de editar cierto producto */}
  const handleUpdateClick = (event) => {
    const productSample = {
      "_id": "64443852d67e",
      "idpersonalizado": "elemental_04",
      "nombre": "gordas feas",
      "presentacion": "xxxl",
      "stock": 15,
      "isFaja": true,
      "proveedor": {
          "nombre": "FAJAS LA FEA",
          "contacto": "31245648584",
          "cc": "123456489"
      },
      "registradopor": {
          "name": "juan",
          "email": "felipe@butrago.com"
      },
      "almacen": [
          {
              "name": "elemental"
          }
      ],
      "categoria": [
          {
              "name": "Fajas",
              "description": "las mejores fajas"
          }
      ]
    }
    if(event.target.id!==""){

      
      startUpdateProducto(event.target.id,productSample);
    }
    else{
      startUpdateProducto(event.target.farthestViewportElement.id,productSample);
    }
  };   
  
  {/* evento de eliminar cierto producto */}
  const handleDeleteClick = (event) => {

    if(event.target.id!==""){
      startDeleteProducto(event.target.id);
    }
    else{
      startDeleteProducto(event.target.farthestViewportElement.id);
    }
  };   
  
  // Filtra las filas de la tabla según la búsqueda por nombre
  const filteredRows = rows.filter((user) =>
    user.nombre.toLowerCase().includes(search.toLowerCase())
  );
  // Calcula el número de filas vacías para rellenar la tabla
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows.length - page * rowsPerPage);
  
  //handle paginacion
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  //handle paginas por pagina
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <>
      {/* CustomBreadcrumbs */}
      <Grid container justifyContent="center" alignItems="center"sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
            <CustomBreadcrumbs pathList={[
              { name: "Inventario", route: "/inventario"},
              { name: "Productos" },]} 
            />
        </Paper>
      </Grid>
      {/* main grid */}
      <Grid container direction="column">
        {/* barra superior, btn crear y busqueda */}
        <Grid container direction="row" justifyContent="space-between">
          {/* L. Titulo Pagina y btn crear */}
          <Grid direction="column">
            <Typography variant="h4" display="inline">Productos</Typography>
            <Typography variant="subtitle1" display="inline" sx={{ ml: 0.9 }}>
              {`${rows.length} total`}
            </Typography> 
            <Grid container sx={{ mt: 2 }} direction="column">
              {/* <Button
                variant="contained"
                fullWidth
                color="success"
                size="large"
                sx={{ backgroundColor: "black", color: "white", mt: 3 }}
                onClick={startCreateProducto}
              >
                Crear producto
              </Button> */}
              <ButtonLink
              to="/productos/crear"
              variant="contained"
              color="success"
              size="medium"
              sx={{ backgroundColor: "black", color: "white", marginRight: 2 }}
              startIcon={<LibraryAddOutlined sx={{ color: "white" }} />}
              >
                Crear Producto
              </ButtonLink>
            </Grid>
          </Grid>

          {/* R. componentes de busqueda */}
          <Grid direction="column" display="flex">
            <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
          </Grid>
        </Grid>
        {/* fin barra superior */}

        <Divider sx={{ mt: 2 }} />

        {/* tabla display data */}
        <Grid container direction="column" sx={{ mt: 2 }}>
          <>
          {/* <TableContainer component="div">
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
                {rows.map((row,index) => 
                  <TableRow key={row._id}>
                    <TableCell>{(index<9)?"product0".concat(index+1):"product".concat(index+1)}</TableCell>
                    <TableCell align="center">{row.nombre}</TableCell>
                    <TableCell align="center">{row.presentacion}</TableCell>
                    <TableCell align="center">{row.proveedor.nombre}</TableCell>
                    
                    <TableCell align="center">
                      {(row.categoria.length>0)?(
                        row.categoria.map(categoria => <span>{categoria.name}</span>)
                        ):<span>no categoria</span>}
                    </TableCell>

                    <TableCell align="center">
                    {(row.almacen.length>0)?(
                      row.almacen.map(almacen =><span>{almacen.name} <br/> </span>)
                    ):<span>no almacen</span>}
                    </TableCell>
                    
                    <TableCell align="center">{row.stock}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="contained"
                        color="info"
                        sx={{ transform: "scale(0.9)" }}
                        id={row._id}
                        onClick={handleUpdateClick}
                      >
                        <EditOutlined id={row._id}/>
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        sx={{ transform: "scale(0.9)" }}
                        id={row._id}
                        onClick={handleDeleteClick}
                        ch
                      >
                        <DeleteForeverOutlined id={row._id}/>
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>  */}
          </>
           <CustomTableV2
            columns={columns}
            filteredRows={filteredRows}
            page={page}
            rowsPerPage={rowsPerPage}
            emptyRows={emptyRows}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            TablePaginationActions={TablePaginationActions}
            updateHandleClick={handleUpdateClick}
            deleteHandleClick={handleDeleteClick}
          /> 
        </Grid>
        {/* fin tabla display data */}
      </Grid>
    </>
  );
}
