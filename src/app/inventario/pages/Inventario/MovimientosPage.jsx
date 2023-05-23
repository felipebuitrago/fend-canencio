import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar, esES } from '@mui/x-data-grid';
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { CustomBreadcrumbs } from "../../components/index.js";
import { useMovimientosStore } from "../../../../hooks";


export const MovimientosPage = () => {
  
  const columns = [
      
        { field: "fecha", headerName: "Fecha", align: "center", headerAlign: 'center' },
        { field: "tipo_transaccion", headerName: "Movimiento", align: "center", headerAlign: 'center' },
        { field: "producto", headerName: "Producto", align: "center", headerAlign: 'center', width: 150 },
        { field: "presentacion", headerName: "Presentación/Talla", headerAlign: 'center', align: "center", width: 150 },
        { field: "cantidad", type: 'number', headerName: "Cantidad", align: "center", headerAlign: 'center' },
        { field: "almacen", headerName: "Almacén", align: "center", headerAlign: 'center' },
        { field: "paciente_proveedor", headerName: "Paciente/Proveedor", align: "center", width: 160 },
        { field: "factura", headerName: "#Factura", align: "center", headerAlign: 'center' },
        { field: "registrado_por", headerName: "Usuario", align: "center", headerAlign: 'center' },
        { field: "nota", headerName: "Notas", align: "center", headerAlign: 'center', width: 200 },
    ];

  const { movimientos, startReadMovimientos } = useMovimientosStore();
  
  useEffect(() => {
    startReadMovimientos();
  }, []);

  const rows = movimientos;

  const [pageSize, setPageSize] = useState(5);
  
  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

  return (
      <>
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ mb: 3, width: "100%" }}
          >
            <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
              <CustomBreadcrumbs
                pathList={[
                  { name: "Inventario", route: "/inventario" },
                  { name: "Movimientos del inventario" },
                ]}
              />
            </Paper>
          </Grid>
          {/* main grid */}
          <Grid container direction="column">
            <Grid container direction="row" justifyContent="space-between">
              <Grid direction="column">
                <Typography variant="h4" display="inline">
                  Movimientos del inventario
                </Typography>
              </Grid>
            </Grid>
          <Divider sx={{ mt: 1 }} />
        
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[5, 10, 25, 50, 100, 1000]}
            onPageSizeChange={handlePageSizeChange}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            components={{
              Toolbar: GridToolbar,
            }}
            sx={{
              '.MuiDataGrid-columnHeader': {
                backgroundColor: 'black',
                color: 'white',
                borderRight: '1px solid white',
              },
              '.MuiDataGrid-toolbarContainer button': {
                color: 'black',
              },
              '.MuiDataGrid-columnHeader .MuiDataGrid-sortIcon': {
                color: 'white',
              },
              '.MuiDataGrid-columnHeader .MuiDataGrid-menuIconButton': {
                color: 'white',
              },
              
            }}
          />
        </Grid>
      </>
  );
};
