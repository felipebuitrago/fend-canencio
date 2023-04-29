import React, { useState } from "react";
import { Button, Divider, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Close, BookmarkAdd} from "@mui/icons-material";
import { CustomBreadcrumbs, ButtonLink, TablePaginationActions, CustomTableMoves } from "../../components/index.js";
import { headerCellStyle } from "../../util/utils";


export const MovimientosPage = () => {
  const pathList = [
    { name: "Inventario", route: "/inventario"},
      { name: "Movimientos de Inventario" },
  ];
  return (
    <>

      <Grid container justifyContent="center" alignItems="center" sx={{ mb: 3, width: "63%" }}>
          <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
            <CustomBreadcrumbs pathList={pathList} />
          </Paper>
        </Grid>
      <Grid container direction="column">
      <Grid container justifyContent="space-between" sx = {{width:"100%"}}>
        <Grid item sx={{width:"100%"}}>
          <Typography variant="h4">Movimiento de Inventario</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2, width:"63%" }} />
      <Grid container direction="column" sx={{ mt: 2 , width:"100%"}}>
        <CustomTableMoves />
      </Grid>
    </Grid>
    </>
  );
};

