import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ShopRoute = ({ children }) => {
    const { currentCart } = useContext(AuthContext);

    if (currentCart === null) {
        return <Navigate to='/shop' />;
    }
    return children;
};

export default ShopRoute;