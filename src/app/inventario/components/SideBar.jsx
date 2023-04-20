import  React  from "react";
import { Box, Collapse, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { AddCircle, Home, Storage, ExpandLess, ExpandMore, Inventory, Widgets } from '@mui/icons-material';
import { Link } from "react-router-dom";

export const SideBar = ({ drawerWidth = 240 }) => {


    const [openInventory, setOpenInventory] = React.useState(false);
    const [openProducts, setOpenProducts] = React.useState(false);
    const [openTerceros, setOpenTerceros] = React.useState(false);
    const [openAlmacenes, setOpenAlmacenes] = React.useState(false);
    const [openUsuarios, setOpenUsuarios] = React.useState(false);

    const handleClick = () => {
      setOpenInventory(!openInventory);
    };

    const handleClickProducts = () => {
      setOpenProducts(!openProducts);
    };

    const handleClickTerceros = () => {
        setOpenTerceros(!openTerceros);
    };
  
    const handleClickAlmacenes = () => {
        setOpenAlmacenes(!openAlmacenes);
    };

    const handleClickUsuarios = () => {
        setOpenUsuarios(!openUsuarios);
    };

    return (
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent" // temporary
          open
          sx={{
            display: { xs: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Juan Canencio
            </Typography>
          </Toolbar>
          <Divider />

           {/*boton inicio*/}
          <List>
            <ListItem disablePadding> {/*boton inicio*/}
              <ListItemButton>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <Link to=''>
                    <ListItemText primary="Inicio" />
                </Link>
              </ListItemButton>
            </ListItem>

            {/*boton inventario*/}
            <ListItemButton onClick={handleClick}>  {/*boton inventario*/}
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="Inventario" />
              {openInventory ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openInventory} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Storage />
                  </ListItemIcon>
                  <Link to='movimientos'>
                    <ListItemText primary="Movimientos de Inventario" />
                  </Link>
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddCircle />
                  </ListItemIcon>
                  <Link to='transaccion'>
                    <ListItemText primary="Realizar transacción" />
                  </Link>
                </ListItemButton>
              </List>
            </Collapse>

            {/*boton Productos*/}
            <ListItemButton onClick={handleClickProducts}>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="Productos" />
              {openProducts ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openProducts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Storage />
                  </ListItemIcon>
                  <Link to='productos'>
                    <ListItemText primary="Administración de Productos" />
                  </Link>
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddCircle />
                  </ListItemIcon>
                  <Link to='categorias'>
                    <ListItemText primary="Administración de categorías" />
                  </Link>
                </ListItemButton>
              </List>
            </Collapse>

            {/*boton Terceros*/}
            <ListItemButton onClick={handleClickTerceros}>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="Terceros" />
              {openTerceros ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openTerceros} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Storage />
                  </ListItemIcon>
                  <Link to='proveedores'>
                    <ListItemText primary="Proveedores" />
                  </Link>
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddCircle />
                  </ListItemIcon>
                  <Link to='pacientes'>
                    <ListItemText primary="Pacientes" />
                  </Link>
                </ListItemButton>
              </List>
            </Collapse>

            {/*boton Almacenes*/}
            <ListItemButton onClick={handleClickAlmacenes}>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="Almacenes" />
              {openAlmacenes ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openAlmacenes} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Storage />
                  </ListItemIcon>
                  <Link to='almacenes'>
                    <ListItemText primary="Administración de almacenes" />
                  </Link>
                </ListItemButton>

                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AddCircle />
                  </ListItemIcon>
                  <Link to='almacenes/canencio'>
                    <ListItemText primary="Administración por almacenes" />
                  </Link>
                </ListItemButton>
              </List>
            </Collapse>

            {/*boton Usuarios*/}
            <ListItemButton onClick={handleClickUsuarios}>
              <ListItemIcon>
                <Inventory />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
              {openUsuarios ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse in={openUsuarios} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Storage />
                  </ListItemIcon>
                  <Link to='usuarios'>
                    <ListItemText primary="Administración de usuarios" />
                  </Link>
                </ListItemButton>

              </List>
            </Collapse>

          </List>
        </Drawer>
      </Box>
    );
}