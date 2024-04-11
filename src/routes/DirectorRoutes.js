import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const DirectorRoutes = ({ children }) => {
    const { currentAuthRole } = useContext(AuthContext);

    if (currentAuthRole !== "Director") {
        return <Navigate to='/employee-login' />;
    }
    return children;
};

export default DirectorRoutes;