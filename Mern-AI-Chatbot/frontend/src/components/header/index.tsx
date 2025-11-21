import { AppBar, Toolbar } from "@mui/material";
import Logo from "../shared/logo";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const authData = useAuth();

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div></div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
