import React, { useState } from 'react';
import { Avatar, Box, Divider, Dialog, DialogContent, DialogTitle,  IconButton, Typography, Tooltip, Menu, MenuItem, ListItemIcon } from '@mui/material';

import {Logout, Close } from '@mui/icons-material';
import { useAuthStore } from '../../../hooks';

const AccountMenu = ({ startLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [dialogOpen, setDialogOpen] = useState(false);

  const { user } = useAuthStore();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    startLogout();
    handleClose();
  };

  const handleAvatarClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
    return (
      <>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Typography variant="h5">{user.name}</Typography>
          <Tooltip title="Usuario - Cerrar sesión" arrow>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar/>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleAvatarClick}>
            <Avatar /> Perfil
          </MenuItem>	
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Cerrar sesión
          </MenuItem>
        </Menu>
      
      <Dialog open={dialogOpen} onClose={handleDialogClose} >
        <DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleDialogClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>

        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }}>
            <Avatar sx={{ mb: 2 }} />
            <Typography variant="subtitle1" component="h2">
               {user.name}
            </Typography>
            <Typography variant="subtitle1"> {user.rol}</Typography>
          </Box>
        </DialogContent>
       
      </Dialog>
    </>
  
    );
  };

export default AccountMenu;


