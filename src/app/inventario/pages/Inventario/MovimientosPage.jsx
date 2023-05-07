import React, { useEffect, useState } from "react";
import { Divider, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination } from "@mui/material";
import { CustomBreadcrumbs, ButtonLink, TablePaginationActions } from "../../components/index.js";
import { useMovimientosStore } from "../../../../hooks";

export const MovimientosPage = () => {

  const columns = [
    { id: "id", label: "ID", align: "center" },
    { id: "fecha", label: "Fecha", align: "center" },
    { id: "tipo_transaccion", label: "Movimiento", align: "center" },
    { id: "producto", label: "Producto", align: "center" },
    { id: "presentacion", label: "Talla/Presentación", align: "center" },
    { id: "cantidad", label: "Cantidad", align: "center" },
    { id: "almacen", label: "Almacén", align: "center" },
    { id: "paciente_proveedor", label: "Paciente/Proveedor", align: "center" },
    { id: "factura", label: "#Factura", align: "center" },
    { id: "registrado_por", label: "Usuario", align: "center" },
    { id: "nota", label: "Notas", align: "center" },
  ];

  
  const { movimientos, startReadMovimientos } = useMovimientosStore();
  
  useEffect(() => {
    startReadMovimientos();
  }, []);

  const rows = movimientos;



  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        <Paper sx={{ overflow: "hidden" }}>
          <TableContainer component="div" sx={{ maxHeight: 440 }}>
            <Table aria-label="custom table" stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      sortDirection={orderBy === headCell.id ? order : false}
                      align="center"
                      sx={{
                        backgroundColor: "black",
                        color: "white",
                        borderRightColor: "white",
                        borderRightWidth: 1,
                        borderRightStyle: "solid",
                        minWidth: headCell.minWidth,
                      }}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={(event) =>
                          handleRequestSort(event, headCell.id)
                        }
                        sx={{
                          color: "inherit",
                          "&:hover": {
                            color: "white",
                          },
                          "& .MuiTableSortLabel-icon": {
                            color: "white !important",
                          },

                          "&.MuiTableSortLabel-active": {
                            color: "white !important",
                          },

                          "&.MuiTableSortLabel-root": {
                            color: "white !important",
                          },
                        }}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,i) => {
                    return (
                      <TableRow hover tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align="center">
                              {(column.id !== "id")? value : ""}

                              {(column.id === "id" && i === 0 && page === 0)?i+1:""}
                              {(column.id === "id" && i === 0 && page !== 0)?(i+1)*(rowsPerPage*page+1):""}
                              {(column.id === "id" && i !== 0 && page === 0)?(i+1)*(page+1):""}
                              {(column.id === "id" && i !== 0 && page !== 0)?(rowsPerPage*page+1)+i:""}

                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100, 1000]}
            component="div"
            count={rows.length}
            labelRowsPerPage="Filas por página"
            rowsPerPage={rowsPerPage}
            page={page}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de ${count}`
            }
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </>
  );
};
