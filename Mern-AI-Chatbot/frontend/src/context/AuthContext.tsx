import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider =
  () =>
  ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);

    useEffect(() => {
      //fetch if the cookie is valid or not and set the user login to true
      setisLoggedIn(false);
      setUser(null);
    }, []);

    const login = async (email: string, password: string) => {};
    const logout = async () => {};

    const value = {
      user,
      login,
      logout,
      isLoggedIn,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  };

export const useAuth = () => useContext(AuthContext);