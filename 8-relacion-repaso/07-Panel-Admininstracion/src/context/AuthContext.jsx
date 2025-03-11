import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for stored user data on component mount
        const storedUser = localStorage.getItem('adminUser');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            // Mock login - replace with actual API call
            const mockUser = {
                id: 1,
                email,
                role: 'admin',
                permissions: ['edit_products', 'delete_users']
            };
            setUser(mockUser);
            localStorage.setItem('adminUser', JSON.stringify(mockUser));
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('adminUser');
        navigate('/login');
    };

    const hasRole = (role) => {
        return user?.role === role;
    };

    const hasPermission = (permission) => {
        return user?.permissions?.includes(permission) || false;
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            login,
            logout,
            hasRole,
            hasPermission
        }}>
            {children}
        </AuthContext.Provider>
    );
};