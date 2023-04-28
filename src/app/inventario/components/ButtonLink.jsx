import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
//solides, en material ui no existe un bonton link solo href para enlaces externos a la app 
const ButtonLink = ({ to, variant, children, color, size, sx, startIcon }) => {
  return (
    <Link to={to} style={{ textDecoration: "none" }}>
      <Button variant={variant}color={color} size={size} sx={sx} startIcon={startIcon}>
        {children}
      </Button>
    </Link>
  );
};

export default ButtonLink;