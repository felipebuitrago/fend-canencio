import React from 'react';
import { Breadcrumbs, Link as MuiLink, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CustomBreadcrumbs = ({ currentPage }) => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <MuiLink color="inherit" component={RouterLink} to="/inventario">
        Inventario
      </MuiLink>
      <Typography color="textPrimary">{currentPage}</Typography>
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;