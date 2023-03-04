import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  userId: null,
  login: (uid: any) => {},
  logout: () => {},
});
