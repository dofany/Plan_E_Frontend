import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserListComponent from "./user/component/UserListComponent";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Nav from "./pages/Nav";



function App() {
  return (
      // <Login/>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Main/>} />
          <Route exact path="/login" element={<Login/>} />
          {/* 전달할 props가 있을경우 아래와 같이 */}
          {/*<Route exact path="/info" render={() => <Info userInfo={userInfo} />} />*/}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
