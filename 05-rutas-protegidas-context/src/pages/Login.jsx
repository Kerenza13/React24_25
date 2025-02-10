import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth()
    const navigate = useNavigate();
    const handleLogin = () => {
        login();
        navigate("/admin");
    };

    return (
        <div>
            <div>
                <h1>Admin Login</h1>
                <button>Login</button>
            </div>
        </div>
    );
};

export default Login