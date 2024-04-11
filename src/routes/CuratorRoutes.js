import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const CuratorRoutes = ({ children }) => {
    const { currentAuthRole } = useContext(AuthContext);

    if (currentAuthRole !== "Curator") {
        return <Navigate to='/admin-login' />;
    }
    return children;
};

export default CuratorRoutes;