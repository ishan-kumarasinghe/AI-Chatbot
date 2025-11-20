import { AppBar, Toolbar } from "@mui/material";
import Logo from "../logo";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const authData = useAuth();
  console.log(authData?.isLoggedIn);

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
