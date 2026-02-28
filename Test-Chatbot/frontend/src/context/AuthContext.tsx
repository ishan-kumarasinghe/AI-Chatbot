import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { loginUser } from "../helpers/api-communicator";

// Shape of data need to work with
type User = {
  name: string;
  email: string;
};
type UserAuth = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create the 'State Container' which can fill with 'UserAuth' data defined above
const AuthContext = createContext<UserAuth | null>(null);

// Provider (Engine)
export const AuthProvider =
  // Children represent everything inside the 'AuthProvider'
  ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);

    // you would put code here to check "Is there a cookie saved in the browser? If yes, log them in automatically."
    useEffect(() => {
      // This runs once when the app first loads
      //fetch if the cookie is valid or not and set the user login to true
      setisLoggedIn(false);
      setUser(null);
    }, []);

    const login = async (email: string, password: string) => {
      const data = await loginUser(email, password);
      if (data) {
        setUser({email: data.email, name: data.name});
        setisLoggedIn(true);
      }
    };
    const signup = async (name: string, email: string, password: string) => {};
    const logout = async () => {};

    // Publish the data - bundles all data into an object called 'value', and broadcasts them to all the children
    const value = {
      user,
      login,
      logout,
      signup,
      isLoggedIn,
    };

    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  };

// Instead of importing 'useContext' and 'AuthContext' in every single file where you need user data
// you just import 'useAuth'
export const useAuth = () => useContext(AuthContext);
