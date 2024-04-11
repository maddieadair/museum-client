import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ManagerRoutes = ({ children }) => {
    const { currentAuthRole } = useContext(AuthContext);

    if (currentAuthRole !== "Manager") {
        return <Navigate to='/employee-login' />;
    }
    return children;
};

export default ManagerRoutes;