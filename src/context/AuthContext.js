import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

// const getAuthID = () => {
//   const AuthID = localStorage.getItem("AuthID");
//   return AuthID ? JSON.parse(AuthID) : null;
// };

// const getAuthRole = () => {
//   const AuthRole = localStorage.getItem("AuthRole");
//   return AuthRole ? JSON.parse(AuthRole) : null;
// };

const getAuthID = () => {
    const AuthID = localStorage.getItem("AuthID");
    return AuthID ? JSON.parse(AuthID) : null;
  };
  
  const getAuthRole = () => {
    const AuthRole = localStorage.getItem("AuthRole");
    return AuthRole ? JSON.parse(AuthRole) : null;
  };

  const getAuthDep = () => {
    const AuthDep = localStorage.getItem("AuthDep");
    return AuthDep ? JSON.parse(AuthDep) : null;
  };

const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? token : null;
}

const getCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : null;
}

// const getToken = () => {
//   const Token = localStorage.getItem("Token");
//   return Token ? Token : null;
// };

// Context Function
export const AuthProvider = ({ children }) => {

  const [currentAuthID, setCurrentAuthID] = useState(getAuthID);
  const [currentAuthRole, setCurrentAuthRole] = useState(getAuthRole);
  const [currentAuthDep, setCurrentAuthDep] = useState(getAuthDep);
  const [currentToken, setCurrentToken] = useState(getToken);
  const [currentCart, setCurrentCart] = useState(getCart);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("AuthID", JSON.stringify(currentAuthID));
    localStorage.setItem("AuthRole", JSON.stringify(currentAuthRole));
    localStorage.setItem("AuthDep", JSON.stringify(currentAuthDep));
    // localStorage.setItem("token", JSON.stringify(currentToken));
    localStorage.setItem("cart", JSON.stringify(currentCart));
  }, [currentAuthID, currentAuthRole, currentToken, currentAuthDep, currentCart]);

  const logout = () => {
    setCurrentAuthID(null);
    setCurrentAuthRole(null);
    setCurrentToken(null);
    setCurrentAuthDep(null);
    setCurrentCart(null);
    alert("Successfully logged out!")
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        currentAuthID,
        setCurrentAuthID,
        currentAuthRole,
        setCurrentAuthRole,
        currentToken,
        setCurrentToken,
        currentAuthDep,
        setCurrentAuthDep,
        currentCart,
        setCurrentCart,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
