import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard"

const isAuthenticated = () => { return localStorage.getItem("token") !== null; }

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    // Deve impedir el acceso al profile a no ser que tenga un token guardado en localstorage
    if (isAuthenticated()) {
        return <Navigate to="/" replace={true} />;
    }
    return children;
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "profile",
                element: (
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                ),
            },
            {
                index: true,
                element: <Home />,
            },
            {
                path: "dashboard",
                element: <Dashboard />,
            },
        ],
    },
]);