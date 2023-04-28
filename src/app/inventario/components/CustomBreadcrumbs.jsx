import React from "react";
import { Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const CustomBreadcrumbs = ({ pathList }) => {
  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      {pathList.map((path, index) => {
        if (index === pathList.length - 1) {
          return <Typography key={index} color="textPrimary">{path.name}</Typography>;
        } else {
          return (
            <MuiLink key={index} color="inherit" component={RouterLink} to={path.route}>
              {path.name}
            </MuiLink>
          );
        }
      })}
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;