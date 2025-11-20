import { AppBar, Toolbar } from "@mui/material";
import Logo from "../logo";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const NavigationLink = ({
  to,
  bg,
  text,
}: {
  to: string;
  bg: string;
  text: string;
}) => {
  return <Link className="navlink" to={to}>{ text }</Link>;
};

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
