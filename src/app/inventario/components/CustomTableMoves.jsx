import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination

} from "@mui/material";



const CustomTableMoves = () => {

  const columns = [
    { id: "id", label: "ID", align: "center"},
    { id: "fecha", label: "Fecha", align: "center" },
    { id: "tipoTransaccion", label: "Movimiento", align: "center"},
    { id: "producto", label: "Producto", align: "center"},
    { id: "tallaPresentacion", label: "Talla/Presentación", align: "center"},
    { id: "cantidad", label: "Cantidad", align: "center"},
    { id: "almacen", label: "Almacén", align: "center"},
    { id: "pacienteProveedor", label: "Paciente/Proveedor", align: "center"},
    { id: "#factura", label: "#Factura", align: "center"},
    { id: "usuario", label: "Usuario", align: "center"},
    { id: "notas", label: "Notas", align: "center"},
  ];
  
  const createData = (id, fecha, tipoTransaccion, producto, tallaPresentacion, cantidad,almacen, pacienteProveedor, numFactura, usuario, notas) => {
    return { id, fecha, tipoTransaccion, producto, tallaPresentacion, cantidad, almacen, pacienteProveedor, numFactura, usuario, notas };
  };

const rows = [
    createData(1, "2021-10-01", "Ingreso", "Producto 1", "S", 50, "Almacen 1", "Proveedor 1", "123456", "Usuario 1", "Notas 1"),
    createData(2, "2021-10-02", "Egreso", "Producto 1", "S", 20, "Almacen 2", "Paciente 1", "123457", "Usuario 2", "Notas 2"),
    createData(3, "2021-10-03", "Ingreso", "Producto 2", "M", 30, "Almacen 3", "Proveedor 2", "123458", "Usuario 3", "Notas 3"),
    createData(4, "2021-10-04", "Egreso", "Producto 2", "M", 40, "Almacen 4", "Paciente 2", "123459", "Usuario 4", "Notas 4"),
    createData(5, "2021-10-05", "Ingreso", "Producto 3", "L", 50, "Almacen 5", "Proveedor 3", "123460", "Usuario 5", "Notas 5"),
    createData(6, "2021-10-06", "Egreso", "Producto 3", "L", 60, "Almacen 6", "Paciente 3", "123461", "Usuario 6", "Notas 6"),
    createData(7, "2021-10-07", "Ingreso", "Producto 4", "XL", 70, "Almacen 7", "Proveedor 4", "123462", "Usuario 7", "Notas 7"),
    createData(8, "2021-10-08", "Egreso", "Producto 4", "XL", 80, "Almacen 8", "Paciente 4", "123463", "Usuario 8", "Notas 8"),
    createData(9, "2021-10-09", "Ingreso", "Producto 5", "XXL", 90, "Almacen 9", "Proveedor 5", "123464", "Usuario 9", "Notas 9"),
    createData(10, "2021-10-10", "Egreso", "Producto 5", "XXL", 100, "Almacen 10", "Paciente 5", "123465", "Usuario 10", "Notas 10"),
    createData(11, "2021-10-11", "Ingreso", "Producto 6", "S", 110, "Almacen 11", "Proveedor 6", "123466", "Usuario 11", "Notas 11"),
 
];

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
                    onClick={(event) => handleRequestSort(event, headCell.id)}
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
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align="center">
                          {value}
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
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={rows.length}
        labelRowsPerPage="Filas por página"
        rowsPerPage={rowsPerPage}
        page={page}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomTableMoves;