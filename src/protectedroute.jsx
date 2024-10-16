import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  //let user = localStorage.getItem("Roleid");
  //user = useAuth();
  console.log("userji", user);

  if (!user) {
    return <Navigate to="/" />;
  }
  console.log("children", children);
  return children;
};

export default PrivateRoute;
