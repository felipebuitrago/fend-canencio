import  React  from "react";
import { Link } from "react-router-dom";
import { Box, Button, Divider, Drawer, 
        List, ListItem, ListItemButton, ListItemIcon,
         ListItemText, Toolbar, Typography } from '@mui/material'
import { AssignmentOutlined,SyncAltOutlined, HomeOutlined, LibraryBooksOutlined,
   InventoryOutlined, CategoryOutlined, LibraryAddOutlined, AccountTreeOutlined,
   DatasetOutlined, StoreOutlined, HubOutlined, Diversity1Outlined, 
   ConnectWithoutContactOutlined,HolidayVillageOutlined, StorefrontOutlined, 
   SupervisorAccountOutlined, PersonSearchOutlined, LogoutOutlined } from '@mui/icons-material';

import { useAuthStore } from '../../../hooks'

import {CustomCollapseButton} from './index.js'

export const SideBar = ({ drawerWidth = 240 }) => {

    const { user,startLogout } = useAuthStore();

    return (
      <Box
        component="nav"
        sx={{ display:'block' ,width: { sm: drawerWidth }, flexShrink: { sm: 0}, zIndex:3
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

          
          <List>
            <Divider />

            {(user.rol === "Administrador")?(
              <>
                {/*boton inicio*/}
                <Link to=''>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <HomeOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Inicio" />
                  </ListItemButton>
                </ListItem>
                </Link>

                <Divider />

                {/*boton inventario*/}
                <CustomCollapseButton
                titulo="Inventario"
                opciones={[
                  {
                    link: "movimientos",
                    prompt: "Movimientos de Inventario",
                  },
                  {
                    link: "transaccion",
                    prompt: "Realizar movimientos",
                  },
                ]}
                iconos={[
                  <InventoryOutlined />,
                  <AssignmentOutlined />,
                  <SyncAltOutlined/>,
                ]}
                />

                {/*boton Productos*/}
                <CustomCollapseButton
                titulo="Productos"
                opciones={[
                  {
                    link: "productos",
                    prompt: "Administración de Productos",
                  },
                  {
                    link: "categorias",
                    prompt: "Administración de categorías",
                  },
                ]}
                iconos={[
                  <DatasetOutlined />,
                  <AccountTreeOutlined />,
                  <CategoryOutlined />,
                ]}
                />

                {/*boton Terceros*/}
                <CustomCollapseButton
                titulo="Terceros"
                opciones={[
                  {
                    link: "proveedores",
                    prompt: "Proveedores",
                  },
                  {
                    link: "pacientes",
                    prompt: "Pacientes",
                  },
                ]}
                iconos={[
                  <HubOutlined />,
                  <ConnectWithoutContactOutlined />,
                  <Diversity1Outlined />,
                ]}
                />

                {/*boton Almacenes*/}
                <CustomCollapseButton
                titulo="Almacenes"
                opciones={[
                  {
                    link: "almacenes",
                    prompt: "Administración de almacenes",
                  },
                  {
                    link: "almacenes/elemental",
                    prompt: "Administración por almacen",
                  },
                ]}
                iconos={[
                  <StoreOutlined />,
                  <HolidayVillageOutlined />,
                  <StorefrontOutlined />,
                ]}
                />

                {/*boton Usuarios*/}
                <CustomCollapseButton
                titulo="Usuarios"
                opciones={[
                  {
                    link: "usuarios",
                    prompt: "Administración de usuarios",
                  },
                ]}
                iconos={[
                  <SupervisorAccountOutlined />,
                  <PersonSearchOutlined />,
                ]}
                />
              </>
            ):(
            <>
              {/*boton inicio*/}
              <Link to=''>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <HomeOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItemButton>
              </ListItem>
              </Link>

              <Divider />

              {/*boton inventario*/}
              <CustomCollapseButton
              titulo="Inventario"
              opciones={[
                {
                  link: "movimientos",
                  prompt: "Movimientos de Inventario",
                },
                {
                  link: "transaccion",
                  prompt: "Realizar transacción",
                },
              ]}
              iconos={[
                <InventoryOutlined />,
                <LibraryBooksOutlined />,
                <LibraryAddOutlined />,
              ]}
              />

              {/*boton Terceros*/}
              <CustomCollapseButton
              titulo="Terceros"
              opciones={[
                {
                  link: "pacientes",
                  prompt: "Pacientes",
                },
              ]}
              iconos={[
                <HubOutlined />,
                <Diversity1Outlined />,
              ]}
              />
            </>
            )}
            
            <ListItem disablePadding> {/*boton cerrar sesion*/}
              <React.Fragment>
                <ListItemButton>
                  <Button
                    onClick={startLogout}
                    variant="contained"
                    fullWidth
                    color="success"
                    sx={{ backgroundColor: "black", color: "white", mt: 2, borderRadius: 20 }}
                    startIcon={<LogoutOutlined sx={{ color: "white" }} />}
                  >
                    Cerrar sesión
                  </Button>
                </ListItemButton>
              </React.Fragment>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    );
}