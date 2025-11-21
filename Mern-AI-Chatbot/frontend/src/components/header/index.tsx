import { AppBar, Toolbar } from "@mui/material";
import Logo from "../shared/logo";
import { useAuth } from "../../context/AuthContext";
import NavigationLink from "../shared/navigationLink";

const Header = () => {
  const authData = useAuth();

  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {authData?.isLoggedIn ? (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/chat"
                text="Go To Chat"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                to="/"
                text="logout"
                textColor="white"
                onClick={authData.logout}
              />
            </>
          ) : (
            <>
              <NavigationLink
                bg="#00fffc"
                to="/login"
                text="Login"
                textColor="black"
              />
              <NavigationLink
                bg="#51538f"
                to="/signup"
                text="Signup"
                textColor="white"
                // onClick={authData.logout}
              />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
