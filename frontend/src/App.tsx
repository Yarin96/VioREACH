import React from "react";
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
import Error from "./shared/components/Error/Error";
import AuthPage, { action as authAction } from "./components/AuthPage/AuthPage";
import {
  loader as detectLoader,
  tokenLoader,
  action as logoutAction,
} from "../src/shared/components/util/auth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      id="root"
      loader={tokenLoader}
      errorElement={<Error />}
    >
      <Route index element={<Introduction />} />
      <Route path="/about" element={<About />} />
      <Route path="/detection" element={<Detection />} loader={detectLoader} />
      <Route path="/auth" element={<AuthPage />} action={authAction} />
      <Route path="/logout" action={logoutAction} />
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
