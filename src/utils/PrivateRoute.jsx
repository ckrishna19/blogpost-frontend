import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useSearchParams } from "react-router-dom";
const PrivateRoute = () => {
  const user = JSON.parse(localStorage?.getItem("loggedInUser"));

  return !!user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
