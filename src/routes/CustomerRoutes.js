import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CustomerRoutes = ({ children }) => {
    const { currentAuthRole } = useContext(AuthContext);

    if (currentAuthRole !== "Customer") {
        return <Navigate to='/user-login' />;
    }
    return children;
};

export default CustomerRoutes;