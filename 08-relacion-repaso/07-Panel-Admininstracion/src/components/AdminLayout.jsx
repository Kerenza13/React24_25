import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    HomeIcon,
    UsersIcon,
    Cog6ToothIcon,
    SunIcon,
    MoonIcon
} from '@heroicons/react/24/outline';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const getBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(Boolean);
        return paths.map((path, index) => ({
            name: path.charAt(0).toUpperCase() + path.slice(1),
            path: '/' + paths.slice(0, index + 1).join('/')
        }));
    };

    const navigationItems = [
        { name: 'Dashboard', icon: HomeIcon, path: '/admin/dashboard' },
        { name: 'Users', icon: UsersIcon, path: '/admin/users' },
        { name: 'Settings', icon: Cog6ToothIcon, path: '/admin/settings' }
    ];

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
                <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Panel</h2>
                </div>
                <nav className="mt-4">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${location.pathname === item.path ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                        >
                            <item.icon className="h-5 w-5 mr-2" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 shadow">
                    <div className="flex items-center justify-between px-4 py-3">
                        {/* Breadcrumbs */}
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                            {getBreadcrumbs().map((crumb, index) => (
                                <div key={crumb.path} className="flex items-center">
                                    {index > 0 && <span className="mx-2">/</span>}
                                    <Link to={crumb.path} className="hover:text-gray-900 dark:hover:text-white">
                                        {crumb.name}
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* User menu and theme toggle */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {isDarkMode ? (
                                    <SunIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                ) : (
                                    <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                                )}
                            </button>
                            <div className="flex items-center">
                                <span className="text-gray-700 dark:text-gray-300 mr-4">{user?.email}</span>
                                <button
                                    onClick={logout}
                                    className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;