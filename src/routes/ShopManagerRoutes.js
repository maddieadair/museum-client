import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ShopManagerRoutes = ({ children }) => {
    const { currentAuthRole } = useContext(AuthContext);

    if (currentAuthRole !== "Shop Manager") {
        return <Navigate to='/employee-login' />;
    }
    return children;
};

export default ShopManagerRoutes;