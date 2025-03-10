import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Simulated authentication check - replace with actual auth logic
    const isAuthenticated = true; // This should come from your auth context/state
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;