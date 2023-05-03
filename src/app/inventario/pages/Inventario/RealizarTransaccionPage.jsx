import React, { useState } from "react";
import { Button, Divider, Grid, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Close, BookmarkAdd} from "@mui/icons-material";
import { CustomBreadcrumbs, ButtonLink, TablePaginationActions,  SearchBar, AlertSnackbar, DeleteConfirmDialog } from "../../components/index.js";
import { headerCellStyle } from "../../util/utils";

export const RealizarTransaccionPage = () => {


  const pathList = [
    { name: "Inventario", route: "/inventario"},
      { name: "Realizar Transacción" },
  ];


  return (
    <>
      <Grid container justifyContent="center" alignItems="center" sx={{ mb: 3, width: "100%" }}>
          <Paper elevation={1} sx={{ p: 1, borderRadius: 1, width: "100%" }}>
            <CustomBreadcrumbs pathList={pathList} />
          </Paper>
        </Grid>
        <Grid container direction="column">
          <Grid container direction="row" justifyContent="space-between">
            <Grid direction="column">
              <Typography variant="h4" display="inline">
                Realizar Transacción
              </Typography>
            </Grid>
          </Grid>
        </Grid>
               
      </>
    );
  };