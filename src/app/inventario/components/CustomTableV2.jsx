import React from 'react';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Button } from '@mui/material';
import { DeleteForeverOutlined, EditOutlined } from '@mui/icons-material';

const CustomTableV2 = ({ columns, filteredRows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage, TablePaginationActions, updateHandleClick, deleteHandleClick }) => {
                        
    return (
    <Grid container direction="column">
      <TableContainer component="div">
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index} align={column.align} sx={{backgroundColor: "black",
                color: "white",
                borderRightColor: "white",
                borderRightWidth: 1,
                borderRightStyle: "solid"}}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredRows
            ).map((row,i) => (
              <TableRow key={row._id}>

                {columns.map((column, index) => (

                  <TableCell key={index} align={column.align}>
                    
                    {(typeof row[column.id] !== "object")?row[column.id]:""}

                    {(column.id === "id" && i === 0 && page === 0)?i+1:""}
                    {(column.id === "id" && i === 0 && page !== 0)?(i+1)*(rowsPerPage*page+1):""}
                    {(column.id === "id" && i !== 0 && page === 0)?(i+1)*(page+1):""}
                    {(column.id === "id" && i !== 0 && page !== 0)?(rowsPerPage*page+1)+i:""}

                    {(column.id === "proveedor")?row[column.id].nombre:""}

                    {(column.id === "categoria")?(row[column.id].length>0)?(
                        row[column.id].map((categoria,index) => <span>{index+1}{ ") " + categoria.name}<br/> </span>)
                        ):<span>no categoria</span>:""}

                    {(column.id === "almacen")?(row[column.id].length>0)?(
                      row[column.id].map(almacen =><span>{almacen.name} <br/> </span>)
                    ):<span>no almacen</span>:""}

                    {(column.id === "acciones")?(
                        <>
                        <Button
                            size="small"
                            variant="contained"
                            color="info"
                            sx={{ transform: "scale(0.9)" }}
                            id={row._id}
                            onClick={updateHandleClick}
                        >
                            <EditOutlined id={row._id}/>
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            color="error"
                            sx={{ transform: "scale(0.9)" }}
                            id={row._id}
                            onClick={deleteHandleClick}
                        >
                            <DeleteForeverOutlined id={row._id}/>
                        </Button>
                        </>
                    ):""}
                  </TableCell>
                ))}
              </TableRow>
            ))}



            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={columns.length} />
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredRows.length}
        labelRowsPerPage="Filas por página"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Grid>
  );
};

export default CustomTableV2;
