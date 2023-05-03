import React, { useState } from "react";
import { Button, Divider, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Close, BookmarkAdd} from "@mui/icons-material";
import { CustomBreadcrumbs, ButtonLink, TablePaginationActions, CustomTableMoves } from "../../components/index.js";


export const MovimientosPage = () => {
  return (
    <>
    <Grid container justifyContent="center" alignItems="center"sx={{ mb: 3, width: "100%" }}>
        <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
            <CustomBreadcrumbs pathList={[
              { name: "Inventario", route: "/inventario"},
              { name: "Movimientos del inventario" },]} 
            />
        </Paper>
      </Grid>
      {/* main grid */}
      <Grid container direction="column">
        {/* barra superior, btn crear y busqueda */}
        <Grid container direction="row" justifyContent="space-between">
          {/* L. Titulo Pagina y btn crear */}
          <Grid direction="column">
            <Typography variant="h4" display="inline">Movimientos del inventario</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 2 }} />
        <Grid container direction="column" sx={{ mt: 2 }}>
        <>
        
        </>
      
        <CustomTableMoves />
        </Grid>
      </Grid>
    </>
  );
}

