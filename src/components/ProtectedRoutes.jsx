import React from "react";
import { useLocation } from "react-router";
import {Navigate, Outlet} from "react-router-dom"


const ProtedRoutes = () => {
  const storeUser = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();
  if (storeUser) {
    return Object.keys(storeUser).length === 0 &&
      storeUser.constructor === Object ? (
      <Navigate to="/auth" replace state={{from : location}} />
    ) : (
      <Outlet />
    );
  } else {
    return <Navigate to="/auth" replace state={{from : location}} />;
  }
};

export default ProtedRoutes;
