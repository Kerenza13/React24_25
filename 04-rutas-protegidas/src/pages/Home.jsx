import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        localStorage.setItem("token", JSON.parse("Hola Mundo"));
        navigate("/dashboard");
    }
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
    
    return (
        <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">bienvenido</h1>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-800 hover:shadow-2x1">Iniciar Sesion</button>
        </div>
    )
}

export default Home