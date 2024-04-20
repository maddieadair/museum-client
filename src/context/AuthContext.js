import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PiGitlabLogoSimpleLight } from "react-icons/pi";

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

const getPrice = () => {
    const price = localStorage.getItem("price");
    return price ? JSON.parse(price) : null;
}

const getDiscount = () => {
    const discount = localStorage.getItem("discount");
    return discount ? JSON.parse(discount) : null;
}

const getTotal = () => {
    const total = localStorage.getItem("total");
    return total ? JSON.parse(total) : null;
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
  const [currentPrice, setCurrentPrice] = useState(getPrice);
  const [currentDiscount, setCurrentDiscount] = useState(getDiscount);
  const [currentTotal, setCurrentTotal] = useState(getTotal);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("AuthID", JSON.stringify(currentAuthID));
    localStorage.setItem("AuthRole", JSON.stringify(currentAuthRole));
    localStorage.setItem("AuthDep", JSON.stringify(currentAuthDep));
    // localStorage.setItem("token", JSON.stringify(currentToken));
    localStorage.setItem("cart", JSON.stringify(currentCart));
    localStorage.setItem("price", JSON.stringify(currentPrice));
    localStorage.setItem("discount", JSON.stringify(currentDiscount));
    localStorage.setItem("total", JSON.stringify(currentTotal));

  }, [currentAuthID, currentAuthRole, currentToken, currentAuthDep, currentCart, currentPrice, currentDiscount, currentTotal]);

  const logout = () => {
    setCurrentAuthID(null);
    setCurrentAuthRole(null);
    setCurrentToken(null);
    setCurrentAuthDep(null);
    setCurrentCart(null);
    setCurrentPrice(null);
    setCurrentDiscount(null);
    setCurrentTotal(null);

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
        currentPrice,
        setCurrentPrice,
        currentTotal,
        setCurrentTotal,
        setCurrentDiscount,
        currentDiscount,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
