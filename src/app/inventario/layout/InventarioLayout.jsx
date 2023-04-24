import { Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar } from '../components/Navbar';
import { SideBar } from '../components/SideBar';

const drawerWidth = 280;

export const InventarioLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }} className='animate__animated animate__fadeIn animate__faster'>

        <NavBar drawerWidth={ drawerWidth } />

        <SideBar drawerWidth={ drawerWidth } />


        <Box 
            component='main'
            sx={{ flexGrow: 1, p: 3}}
        >
            <Toolbar />

            { children }
            
        </Box>
    </Box>
  )
}