import { createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import LoginForm from '../components/LoginForm';
import AdminLayout from '../components/AdminLayout';

const router = createBrowserRouter([
    {
        path: '/login',
        element: (
            <AuthProvider>
                <LoginForm />
            </AuthProvider>
        )
    },
    {
        path: '/admin',
        element: (
            <AuthProvider>
                <ProtectedRoute>
                    <AdminLayout />
                </ProtectedRoute>
            </AuthProvider>
        ),
        children: [
            {
                path: 'dashboard',
                element: <div>Dashboard Content</div>
            },
            {
                path: 'users',
                element: (
                    <ProtectedRoute requiredPermission="manage_users">
                        <div>Users Management</div>
                    </ProtectedRoute>
                )
            },
            {
                path: 'products',
                element: (
                    <ProtectedRoute requiredPermission="manage_products">
                        <div>Products Management</div>
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: '/unauthorized',
        element: <div>Unauthorized Access</div>
    },
    {
        path: '*',
        element: <div>404 Not Found</div>
    }
]);

export { router };