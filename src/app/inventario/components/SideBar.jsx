import  React  from "react";
import { Link } from "react-router-dom";
import { Box, Button, Collapse, Divider, Drawer, Grid, 
        List, ListItem, ListItemButton, ListItemIcon,
         ListItemText, Toolbar, Typography } from '@mui/material'
import { HomeOutlined, LibraryBooksOutlined, ExpandLess, ExpandMore,
   InventoryOutlined, CategoryOutlined, LibraryAddOutlined, AccountTreeOutlined,
   DatasetOutlined, StoreOutlined, HubOutlined, Diversity1Outlined, 
   ConnectWithoutContactOutlined,HolidayVillageOutlined, StorefrontOutlined, 
   SupervisorAccountOutlined, PersonSearchOutlined, LogoutOutlined } from '@mui/icons-material';

import { useAuthStore } from '../../../hooks'

export const SideBar = ({ drawerWidth = 240 }) => {

    const [openInventory, setOpenInventory] = React.useState(false);
    const [openProducts, setOpenProducts] = React.useState(false);
    const [openTerceros, setOpenTerceros] = React.useState(false);
    const [openAlmacenes, setOpenAlmacenes] = React.useState(false);
    const [openUsuarios, setOpenUsuarios] = React.useState(false);

    const { startLogout } = useAuthStore();


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
        sx={{ display:'block' ,width: { sm: drawerWidth }, flexShrink: { sm: 0}, zIndex:0
        }}
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
              Menú
            </Typography>
          </Toolbar>
          <Divider />

           {/*boton inicio*/}
          <List>
            <Divider />
            
            <Link to='' >
              <ListItem disablePadding> {/*boton inicio*/}
                <ListItemButton>
                  <ListItemIcon >
                    <HomeOutlined/>
                  </ListItemIcon>
                      <ListItemText primary="Inicio"/>
                  
                </ListItemButton>
              </ListItem>
            </Link>

          <Divider />

            {/*boton inventario*/}
            <ListItemButton onClick={handleClick}>  {/*boton inventario*/}
              <ListItemIcon>
                <InventoryOutlined />
              </ListItemIcon>
              <ListItemText primary="Inventario" />
              {openInventory ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Divider />
            <Collapse in={openInventory} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                
              <Link to='movimientos'>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <LibraryBooksOutlined  />
                  </ListItemIcon>
                    <ListItemText primary="Movimientos de Inventario" />
                </ListItemButton>
              </Link>

              <Link to='transaccion'>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <LibraryAddOutlined />
                  </ListItemIcon>
                    <ListItemText primary="Realizar transacción" />
                </ListItemButton>
              </Link>
            </List>
            
            <Divider />

            </Collapse>

            {/*boton Productos*/}
            <ListItemButton onClick={handleClickProducts}>
              <ListItemIcon>
                <DatasetOutlined />
              </ListItemIcon>
              <ListItemText primary="Productos" />
              {openProducts ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider />


            <Collapse in={openProducts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                
              <Link to='productos'>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <AccountTreeOutlined  />
                  </ListItemIcon>
                    <ListItemText primary="Administración de Productos" />
                </ListItemButton>
              </Link>

              <Link to='categorias'>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <CategoryOutlined />
                  </ListItemIcon>
                    <ListItemText primary="Administración de categorías" />
                </ListItemButton>
              </Link>

              </List>
            <Divider />

            </Collapse>

            {/*boton Terceros*/}
            <ListItemButton onClick={handleClickTerceros}>
              <ListItemIcon>
                <HubOutlined />
              </ListItemIcon>
              <ListItemText primary="Terceros" />
              {openTerceros ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider />

            <Collapse in={openTerceros} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

              <Link to='proveedores'>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <ConnectWithoutContactOutlined  />
                  </ListItemIcon>
                    <ListItemText primary="Proveedores" />
                </ListItemButton>
              </Link>

              <Link to='pacientes'>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Diversity1Outlined />
                  </ListItemIcon>
                    <ListItemText primary="Pacientes" />
                </ListItemButton>
              </Link>

              </List>
            <Divider />

            </Collapse>

            {/*boton Almacenes*/}
            <ListItemButton onClick={handleClickAlmacenes}>
              <ListItemIcon>
                <StoreOutlined />
              </ListItemIcon>
              <ListItemText primary="Almacenes" />
              {openAlmacenes ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Divider />

            <Collapse in={openAlmacenes} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

              <Link to='almacenes'>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <HolidayVillageOutlined  />
                  </ListItemIcon>
                    <ListItemText primary="Administración de almacenes" />
                </ListItemButton>
              </Link>

              <Link to='almacenes/canencio'>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StorefrontOutlined />
                  </ListItemIcon>
                    <ListItemText primary="Administración por almacenes" />
                </ListItemButton>
              </Link>

            </List>
              <Divider />
            </Collapse>

            {/*boton Usuarios*/}
            <ListItemButton onClick={handleClickUsuarios}>
              <ListItemIcon>
                <SupervisorAccountOutlined />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
              {openUsuarios ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Divider />

            <Collapse in={openUsuarios} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>

              <Link to='usuarios'>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PersonSearchOutlined  />
                  </ListItemIcon>
                    <ListItemText primary="Administración de usuarios" />
                </ListItemButton>
              </Link>

            </List>
            <Divider />
            </Collapse>

            <ListItem disablePadding> {/*boton inicio*/}
              <ListItem>
              <Button 
                    onClick={startLogout}
                    variant='contained' fullWidth color="success"
                    sx={{backgroundColor:'black',color:'white',  mt:2}} 
                    startIcon={<LogoutOutlined sx={{color:'white'}}/>}>
                  Cerrar sesión
              </Button>
              </ListItem>
            </ListItem>

          </List>
        </Drawer>
      </Box>
    );
}