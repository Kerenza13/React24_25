import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        // Lo mando a la pagina del login /
        return <Navigate to="/" replace={true} />
    }
    return children;
};

export default ProtectedRoute;