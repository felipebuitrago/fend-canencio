import { AppBar, Button, Grid, Toolbar } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../../hooks";
import AccountMenu from "./AccountMenu";

export const NavBar = ({ drawerWidth = 240 }) => {
  const params = useParams();
  const { startLogout } = useAuthStore();

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "black" }}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/elemental-logo.png"
              alt="Elemental"
              style={{ height: "62px", width: "75px" }}
            />
            <img
              src="/juanCanencio-logo.svg"
              alt="Juan Canencio"
              style={{ height: "40px", alignContent: "center" }}
            />
          </div>

          <div>
            <AccountMenu startLogout={startLogout} />
          </div>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
