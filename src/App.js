import React from "react";
import { Route, Routes, useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import {baseTheme} from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router";
import Login from "./views/login/Login";
import ToastPop from "./components/Toast/ToastPop";
import { CookiesProvider } from "react-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import ModalPop from "./components/modal/ModalPop";


const App = () => {
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  return (
    <>
    <CookiesProvider/>
    <ToastPop/>
    <ModalPop/>
    <ThemeProvider theme={theme}>
      {routing}
    </ThemeProvider>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/login" element={<Login/>} />
      </Routes>
    </>
  );
};

export default App;
