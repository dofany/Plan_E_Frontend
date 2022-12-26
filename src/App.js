import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserListComponent from "./user/component/UserListComponent";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Nav from "./pages/Nav";
import ToastPop from "./common/component/toast/ToastPop";
import ModalPop from "./common/component/modal/ModalPop";
import React, {useState} from "react";
import {CookiesProvider} from "react-cookie";




function App() {
  return (
      <>
          <CookiesProvider/>
          <ToastPop/>
          <BrowserRouter>
            <Nav />
              <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/main" element={<Main/>} />
              {/* 전달할 props가 있을경우 아래와 같이 */}
              {/*<Route exact path="/info" render={() => <Info userInfo={userInfo} />} />*/}
              </Routes>
          </BrowserRouter>
          {/*</CookiesProvider>*/}
      </>
  );
}

export default App;
