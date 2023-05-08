import  React from "react";
import { Link } from "react-router-dom";
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const CustomCollapseButton = ({titulo,opciones,iconos}) => {

    const [open, setOpenInventory] = React.useState(false);
    const handleClick = () => {
        setOpenInventory(!open);
    };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          {iconos[0]}
        </ListItemIcon>
        <ListItemText primary={titulo} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Divider />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {
                opciones.map((opcion,index)=>
                  <Link key={opcion.link} to={opcion.link}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        {iconos[index+1]}
                      </ListItemIcon>
                      <ListItemText primary={opcion.prompt} />
                    </ListItemButton>
                  </Link>
                )
            }
        </List>
        <Divider />
      </Collapse>
    </>
  );
}

export default CustomCollapseButton;

