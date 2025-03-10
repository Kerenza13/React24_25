import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        // lo mando a la pagina de login /
        return <Navigate to="/login" replace={true} />;
    }
    // si puedes pasar
    return children;
}

export default PrivateRoute