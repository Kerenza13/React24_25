import { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(localStorage.getItem("user") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Effect para comprobar que el usuario tiene la sesion iniciada
    useEffect(() => {
        if (token) setIsAuthenticated(true)
    }, [])



    const login = async ({ email, password }) => {
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Usuario o contraseña incorrectos");
            }
            // Si estoy aquí es porque el usuario se ha logueado correctamente
            const data = await response.json();
            setUser(data.user);
            setToken(data.token);
            setIsAuthenticated(true);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
        } catch (error) {
            console.log("Error al iniciar sesión", error);
        }
    };

    const logOut = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };
    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
    }
    return context;
};
