import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const PublicRoute = () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  return !!user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
