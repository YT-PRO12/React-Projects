import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = () => {

    login();

    navigate("/profile");
  };

  return (
    <div>

      <h1>Login Page</h1>

      <button onClick={handleLogin}>
        Login
      </button>

    </div>
  );
}

export default Login;