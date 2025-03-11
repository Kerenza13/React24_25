import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activityLogs, setActivityLogs] = useState([]);
    const navigate = useNavigate();

    // Mock data for development
    const mockUsers = [
        { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin', permissions: ['edit_products', 'delete_users'] },
        { id: 2, name: 'Editor User', email: 'editor@example.com', role: 'editor', permissions: ['edit_products'] },
        { id: 3, name: 'Guest User', email: 'guest@example.com', role: 'guest', permissions: [] }
    ];

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // TODO: Replace with actual API call
            // const response = await fetch('/api/users');
            // const data = await response.json();
            setUsers(mockUsers);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
        }
    };

    const assignRole = (userId, newRole) => {
        setUsers(users.map(user => {
            if (user.id === userId) {
                const updatedUser = { ...user, role: newRole };
                logActivity(`Changed role of ${user.name} to ${newRole}`);
                return updatedUser;
            }
            return user;
        }));
    };

    const assignPermission = (userId, permission) => {
        setUsers(users.map(user => {
            if (user.id === userId) {
                const permissions = user.permissions.includes(permission)
                    ? user.permissions.filter(p => p !== permission)
                    : [...user.permissions, permission];
                const updatedUser = { ...user, permissions };
                logActivity(`Updated permissions for ${user.name}`);
                return updatedUser;
            }
            return user;
        }));
    };

    const logActivity = (message) => {
        const newLog = {
            id: Date.now(),
            message,
            timestamp: new Date().toISOString()
        };
        setActivityLogs(prev => [newLog, ...prev].slice(0, 50));
    };

    const checkPermission = (userId, permission) => {
        const user = users.find(u => u.id === userId);
        return user?.permissions.includes(permission) || false;
    };

    return {
        users,
        loading,
        error,
        activityLogs,
        assignRole,
        assignPermission,
        checkPermission,
        logActivity
    };
};