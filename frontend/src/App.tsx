import React, { useCallback, useState } from "react";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import RootLayout from "./shared/components/RootLayout/RootLayout";
import Introduction from "./components/Introduction/Introduction";
import About from "./components/About/About";
import Detection from "./components/Detection/Detection";
import Auth from "./user/Auth/Auth";
import { AuthContext } from "./shared/context/auth-context";

const router = createBrowserRouter(
  createRoutesFromElements(
    /// Add: errorElement={} as props to Route
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Introduction />} />
      <Route path="/about" element={<About />} />
      <Route path="/detection" element={<Detection />} />
      <Route path="/auth" element={<Auth />} />
    </Route>
  )
);

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid: any) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
};

export default App;
