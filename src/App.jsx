import React, { lazy, useEffect, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import Home from "./pages/Home";
//import Login from "./pages/Login";
import "./App.css";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./utils/Spinner";
//import Register from "./pages/Register";
// if css not working, then copy this <link rel="stylesheet" href="./src/App.css" /> and paste in head tag of index.html file

const Register = lazy(() => import("./pages/Register"));

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
import { fetchSocket } from "./redux/slices/authSlice";
import io from "socket.io-client";
import createConnection from "./utils/createConnection";
const App = () => {
  const { userInfo } = useSelector((state) => state?.authInfo || {});
  const dispatch = useDispatch();

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
