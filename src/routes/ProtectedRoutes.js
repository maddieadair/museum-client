import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { currentAuthRole, currentAuthID } = useContext(AuthContext);

  if (currentAuthID !== null && currentAuthRole !== null) {
    if (currentAuthRole === "Curator") {
      return <Navigate to="/curator" />;
    } else if (currentAuthRole === "Manager") {
      return <Navigate to="/manager" />;
    } else if (currentAuthRole === "Shop Manager") {
      return <Navigate to="/shop-manager" />;
    } else if (currentAuthRole === "Director") {
      return <Navigate to="/director" />;
    } else if (currentAuthRole === "Customer") {
      return <Navigate to="/" />;
    }
  }
  return children;
};

export default ProtectedRoutes;
