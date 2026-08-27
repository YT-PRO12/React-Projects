import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {

  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (
    <div>

      <h1>My Profile</h1>

      <p>Welcome to your profile!</p>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default Profile;