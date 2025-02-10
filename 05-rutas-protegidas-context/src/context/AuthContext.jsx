import { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(false)

    const login = () => {
        if (JSON.parse(localStorage.getItem('token')) === true) {
            setAuthenticated(true)
        }
    }

    const logout = () => {
        localStorage.setItem('token', JSON.stringify(false))
        setAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}


// Creo un hook personalizado para exportar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
    }
    return context;
}